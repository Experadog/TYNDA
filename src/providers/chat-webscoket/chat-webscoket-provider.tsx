'use client';

import { useRouter } from '@/i18n/routing';
import { PAGES, WEBSOCKET_API, decryptData } from '@/lib';
import { type Message, UserRole } from '@business-entities';
import { pushCommonToast } from '@common';
import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';

type SendMessageRequest = {
	message: {
		content: string;
		content_type: Message['message']['content_type'];
		chat_id: string;
	};
};

interface WebSocketContextValue {
	isConnected: boolean;
	messages: Message[];
	sendMessage: (data: SendMessageRequest) => void;
	reconnect: () => void;
}

const WebSocketContext = createContext<WebSocketContextValue | undefined>(undefined);

interface ChatWebSocketProviderProps {
	session?: string;
	children: ReactNode;
}

export const ChatWebSocketProvider = ({ session, children }: ChatWebSocketProviderProps) => {
	const router = useRouter();
	const socketRef = useRef<WebSocket | null>(null);
	const [isConnected, setIsConnected] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);

	const reconnectAttempts = useRef(0);
	const maxReconnectAttempts = 5;
	const reconnectDelay = 2000;

	const connectWebSocket = useCallback(() => {
		if (!session) return;

		const data = decryptData(session);
		if (!data) return;

		const {
			access_token,
			user: { role, is_superuser },
		} = data;

		//in testing
		if (role === UserRole.ESTABLISHER) {
			console.log('Веб-Сокет пока не доступен для владельца');
			return;
		}

		const ws = new WebSocket(WEBSOCKET_API + access_token);

		socketRef.current = ws;

		ws.onopen = () => {
			console.log('✅ WebSocket подключен');
			setIsConnected(true);
			reconnectAttempts.current = 0;
		};

		ws.onmessage = (event) => {
			try {
				const data: Message = JSON.parse(event.data);
				console.log('📨 Получено сообщение:', data);
				if (data.is_system) {
					if (role === UserRole.CLIENT && !is_superuser) {
						router.push(PAGES.PROFILE_CHAT);
					}

					if (is_superuser) {
						router.push(PAGES.DASHBOARD_CHAT);
					}

					pushCommonToast('Произошла системная ошибка', 'error');
					return;
				}

				setMessages((prev) => [...prev, data]);
			} catch (error) {
				console.error('Ошибка парсинга сообщения:', error);
			}
		};

		ws.onerror = (error) => {
			console.error('WebSocket ошибка:', error);
		};

		ws.onclose = () => {
			console.log('❌ WebSocket закрыт');
			setIsConnected(false);

			if (reconnectAttempts.current < maxReconnectAttempts) {
				reconnectAttempts.current += 1;
				setTimeout(() => {
					console.log(`🔁 Попытка переподключения #${reconnectAttempts.current}`);
					connectWebSocket();
				}, reconnectDelay * reconnectAttempts.current);
			} else {
				console.warn('🚫 Достигнут лимит попыток переподключения');
			}
		};
	}, [session]);

	useEffect(() => {
		connectWebSocket();
		return () => {
			socketRef.current?.close();
		};
	}, [connectWebSocket]);

	const sendMessage = useCallback((data: SendMessageRequest) => {
		if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
			socketRef.current.send(JSON.stringify(data));
		} else {
			console.warn('WebSocket не подключен, сообщение не отправлено');
		}
	}, []);

	const reconnect = useCallback(() => {
		console.log('🔄 Ручное переподключение WebSocket...');

		if (socketRef.current) {
			socketRef.current.onclose = () => {
				console.log('🔌 Старое соединение закрыто, подключаем новое...');
				setIsConnected(false);
				connectWebSocket();
			};
			socketRef.current.close();
		} else {
			connectWebSocket();
		}
	}, [connectWebSocket]);

	const value = {
		isConnected,
		messages,
		sendMessage,
		reconnect,
	};

	return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
};

export const useChatWebSocket = (): WebSocketContextValue => {
	const context = useContext(WebSocketContext);
	if (!context) {
		throw new Error('useWebSocket должен использоваться внутри ChatWebSocketProvider');
	}
	return context;
};
