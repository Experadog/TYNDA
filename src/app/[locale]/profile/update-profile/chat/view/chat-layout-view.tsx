'use client';

import {
	type ChatListRetrievalResponseModel,
	type EstablishmentClientRetrievalResponseModel,
	getUserChatList,
} from '@/services';
import { usePagination } from '@common';
import { ChatCustomLayout } from '@components';
import type { ReactNode } from 'react';

interface Props {
	children: ReactNode;
	chats: ChatListRetrievalResponseModel['data'];
	establishments: EstablishmentClientRetrievalResponseModel['data'];
}

const ChatLayoutView = ({ children, chats, establishments }: Props) => {
	const {
		states: { list },
	} = usePagination({
		entity: 'chat',
		fetchFn: getUserChatList,
		initialData: chats,
	});

	return (
		<ChatCustomLayout scope="profile" chats={list} establishments={establishments}>
			{children}
		</ChatCustomLayout>
	);
};

export default ChatLayoutView;
