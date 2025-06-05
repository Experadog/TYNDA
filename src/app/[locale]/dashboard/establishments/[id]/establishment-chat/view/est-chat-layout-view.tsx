'use client';
import { useChatContext } from '@/app/[locale]/dashboard/chat/context/chat-context-provider';
import { useChatWebSocket } from '@/providers/chat-webscoket/chat-webscoket-provider';
import type { ChatListRetrievalResponseModel } from '@/services';
import { ChatCustomLayout } from '@components';
import { type ReactNode, useEffect } from 'react';

type Props = {
	children: ReactNode;
	chatResponse: ChatListRetrievalResponseModel['data'];
	establishment_id: string;
};

const EstChatLayoutView = ({ children, chatResponse, establishment_id }: Props) => {
	const { connectWebSocket } = useChatWebSocket();
	const { setEstablishmentChats } = useChatContext();

	useEffect(() => {
		connectWebSocket(establishment_id);
		setEstablishmentChats(chatResponse);
	}, [establishment_id]);

	return (
		<ChatCustomLayout scope="establishment" chats={chatResponse.items}>
			{children}
		</ChatCustomLayout>
	);
};

export default EstChatLayoutView;
