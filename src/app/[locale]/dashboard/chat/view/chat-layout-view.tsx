'use client';
import {
	type ChatListRetrievalResponseModel,
	type GetEstablishmentAllClientResponseModel,
	getUserChatList,
} from '@/services';
import { usePagination } from '@common';
import { ChatCustomLayout } from '@components';
import type { ReactNode } from 'react';

type Props = {
	children: ReactNode;
	chatsResponse: ChatListRetrievalResponseModel['data'];
	establishmentResponse: GetEstablishmentAllClientResponseModel['data'];
};

const ChatLayoutView = ({ children, chatsResponse, establishmentResponse }: Props) => {
	const {
		states: { list },
	} = usePagination({
		entity: 'chat',
		fetchFn: getUserChatList,
		initialData: chatsResponse,
	});

	return (
		<ChatCustomLayout scope="dashboard" chats={list} establishments={establishmentResponse}>
			{children}
		</ChatCustomLayout>
	);
};

export default ChatLayoutView;
