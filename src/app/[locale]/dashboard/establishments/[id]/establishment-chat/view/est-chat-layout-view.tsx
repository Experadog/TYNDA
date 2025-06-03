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
	const { setEstablishmentID } = useChatWebSocket();
	const { setData } = useChatContext();

	useEffect(() => {
		setEstablishmentID(establishment_id);
		setData(chatResponse);
	}, [establishment_id]);

	return (
		<ChatCustomLayout
			scope="establishment"
			chats={{ existing_chats: chatResponse.items, new_chats: [] }}
		>
			{children}
		</ChatCustomLayout>
	);
};

export default EstChatLayoutView;
