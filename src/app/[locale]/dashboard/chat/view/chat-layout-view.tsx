'use client';
import { divideChatToNewAndExisting } from '@/lib';
import { ChatCustomLayout } from '@components';
import type { ReactNode } from 'react';
import { useEstablishmentContext } from '../../establishments/use-case/establishment-context-provider';
import { useChatContext } from '../context/chat-context-provider';

type Props = {
	children: ReactNode;
};

const ChatLayoutView = ({ children }: Props) => {
	const { chatList, onCreate } = useChatContext();

	const {
		states: { establishments },
	} = useEstablishmentContext();

	return (
		<ChatCustomLayout
			scope="dashboard"
			chats={divideChatToNewAndExisting(establishments.items, chatList.items)}
			onClick={onCreate}
		>
			{children}
		</ChatCustomLayout>
	);
};

export default ChatLayoutView;
