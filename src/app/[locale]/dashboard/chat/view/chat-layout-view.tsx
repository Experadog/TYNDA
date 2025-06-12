'use client';
import { getUserChatList } from '@/services';
import { usePagination } from '@common';
import { ChatCustomLayout } from '@components';
import type { ReactNode } from 'react';
import { useEstablishmentContext } from '../../establishments/use-case/establishment-context-provider';
import { useChatContext } from '../context/chat-context-provider';

type Props = {
	children: ReactNode;
};

const ChatLayoutView = ({ children }: Props) => {
	const { chatList } = useChatContext();
	const {
		pagination: {
			states: { initialData },
		},
	} = useEstablishmentContext();

	const {
		states: { list },
	} = usePagination({
		entity: 'chat',
		fetchFn: getUserChatList,
		initialData: chatList,
	});

	return (
		<ChatCustomLayout scope="dashboard" chats={list} establishments={initialData}>
			{children}
		</ChatCustomLayout>
	);
};

export default ChatLayoutView;
