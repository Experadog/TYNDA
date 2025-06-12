'use client';
import { useChatContext } from '@/app/[locale]/dashboard/chat/context/chat-context-provider';
import { URL_ENTITIES } from '@/lib';
import { useChatWebSocket } from '@/providers/chat-webscoket/chat-webscoket-provider';
import type { ChatListRetrievalResponseModel } from '@/services';
import { revalidateByTags } from '@common';
import { ChatCustomLayout } from '@components';
import { type ReactNode, useEffect } from 'react';

type Props = {
	children: ReactNode;
	chatResponse: ChatListRetrievalResponseModel['data'];
	establishment_id: string;
};

const EstChatLayoutView = ({ children, chatResponse, establishment_id }: Props) => {
	const { connectWebSocket, shouldRefreshChatList, messages } = useChatWebSocket();
	const { setEstablishmentChats } = useChatContext();

	useEffect(() => {
		connectWebSocket(establishment_id);
		setEstablishmentChats(chatResponse);
	}, [establishment_id]);

	const refreshChatList = async () => {
		await revalidateByTags([URL_ENTITIES.CHAT_ESTABLISHMENT]);
	};

	useEffect(() => {
		if (shouldRefreshChatList) {
			refreshChatList();
		}
	}, [shouldRefreshChatList, messages]);

	return (
		<ChatCustomLayout scope="establishment" chats={chatResponse.items}>
			{children}
		</ChatCustomLayout>
	);
};

export default EstChatLayoutView;
