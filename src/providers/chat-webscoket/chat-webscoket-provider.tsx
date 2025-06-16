'use client';

import { useRouter } from '@/i18n/routing';
import { PAGES, WEBSOCKET_API, decryptData } from '@/lib';
import { type Message, type Session, UserRole, type WebSocketMessage } from '@business-entities';
import { EntityStatusEnum, pushCommonToast } from '@common';
import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { RiChatDeleteLine } from 'react-icons/ri';

type SendMessageRequest = {
	message: {
		content: string;
		content_type: WebSocketMessage['message']['content_type'];
		chat_id: string;
	};
};

interface WebSocketContextValue {
	isConnected: boolean;
	messages: Message[];
	sendMessage: (data: SendMessageRequest) => void;
	connectWebSocket: (establishmentID?: string) => void;
	disconnectWebSocket: () => void;
	shouldRefreshChatList: boolean;
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
	const [shouldRefreshChatList, setShouldRefreshChatList] = useState(false);

	const resetState = () => {
		setIsConnected(false);
		setMessages([]);
		setShouldRefreshChatList(false);
	};

	const disconnectWebSocket = useCallback(() => {
		if (socketRef.current) {
			socketRef.current.close();
			socketRef.current = null;
		}
		resetState();
	}, []);

	const connectWebSocket = useCallback(
		(establishmentID?: string) => {
			if (!session) return;

			const data = decryptData<Session>(session);
			if (!data) return;

			if (data.user.status === EntityStatusEnum.DISABLE) {
				return;
			}

			const {
				access_token,
				user: { role, is_superuser },
			} = data;

			if (role === UserRole.ESTABLISHER && !establishmentID) return;

			function buildWSUrl() {
				let url = WEBSOCKET_API + access_token;
				if (role === UserRole.ESTABLISHER && establishmentID) {
					url += `&establishment_id=${establishmentID}`;
				}
				return url;
			}

			const ws = new WebSocket(buildWSUrl());
			socketRef.current = ws;

			ws.onopen = () => {
				console.log('✅ WebSocket подключен');
				setIsConnected(true);
			};

			ws.onmessage = (event) => {
				try {
					const response: WebSocketMessage = JSON.parse(event.data);
					console.log('📨 Получено сообщение:', response);

					if (response.is_system) {
						if (role === UserRole.CLIENT && !is_superuser) {
							router.push(PAGES.PROFILE_CHAT);
						}
						if (is_superuser) {
							router.push(PAGES.DASHBOARD_CHAT);
						}
						pushCommonToast('Веб-Сокет не подключен', 'info', {
							icon: <RiChatDeleteLine className="text-yellow" />,
						});
						return;
					}

					if (response.code !== 200) {
						pushCommonToast('Веб-Сокет не подключен', 'info', {
							icon: <RiChatDeleteLine className="text-yellow" />,
						});
						return;
					}

					const { message, data, is_system } = response;

					setMessages((prev) => {
						const isChatIdNew = !prev.some(
							(existedMessage) => existedMessage.chat_id === message.chat_id,
						);

						setShouldRefreshChatList(isChatIdNew);
						return [...prev, { ...message, data, is_system }];
					});
				} catch (error) {
					console.error('Ошибка парсинга сообщения:', error);
				}
			};

			ws.onerror = (error) => {
				console.error('WebSocket ошибка:', error);
			};

			ws.onclose = () => {
				console.log('❌ WebSocket закрыт');
				resetState();
			};
		},
		[session, router],
	);

	useEffect(() => {
		if (session) {
			connectWebSocket();
		}
	}, [session]);

	const sendMessage = useCallback((data: SendMessageRequest) => {
		if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
			socketRef.current.send(JSON.stringify(data));
		} else {
			console.warn('WebSocket не подключен, сообщение не отправлено');
		}
	}, []);

	const value = {
		isConnected,
		messages,
		sendMessage,
		connectWebSocket,
		disconnectWebSocket,
		shouldRefreshChatList,
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
