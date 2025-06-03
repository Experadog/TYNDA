'use client';

import type { ChatPreparingViewType } from '@business-entities';
import { ChatCustomLayout } from '@components';
import type { ReactNode } from 'react';
import { useChatUseCase } from '../use-cases/useChatUseCase';

interface Props {
	children: ReactNode;
	chats: ChatPreparingViewType;
}

const ChatLayoutView = ({ children, chats }: Props) => {
	const { onCreate } = useChatUseCase();

	return (
		<ChatCustomLayout scope="profile" chats={chats} onClick={onCreate}>
			{children}
		</ChatCustomLayout>
	);
};

export default ChatLayoutView;
