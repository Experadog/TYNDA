'use client';

import type { ChatListRetrievalResponseModel } from '@/services';
import { type FC, type ReactNode, createContext, useContext } from 'react';
import { type UseChatUseCaseType, useChatUseCase } from '../use-cases/useChatUseCase';

type Props = {
	children: ReactNode;
	chatResponse: ChatListRetrievalResponseModel;
};

const ChatContext = createContext<UseChatUseCaseType | null>(null);

export const ChatContextProvider: FC<Props> = ({ children, chatResponse }) => {
	const value = useChatUseCase({
		chatList: chatResponse?.data,
	});

	return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export function useChatContext(): UseChatUseCaseType {
	const context = useContext(ChatContext);
	if (!context) {
		throw new Error('useChatContext must be used within an ChatContextProvider');
	}

	return context;
}
