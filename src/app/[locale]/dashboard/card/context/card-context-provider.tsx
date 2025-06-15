'use client';

import type { CardListRetrievalResponseModel } from '@/services';
import { type FC, type ReactNode, createContext, useContext } from 'react';
import { type UseCardUseCaseType, useCardUseCase } from '../use-cases/useCardUseCase';

type Props = {
	children: ReactNode;
	cardResponse: CardListRetrievalResponseModel['data'];
};

const CardContext = createContext<UseCardUseCaseType | null>(null);

export const CardContextProvider: FC<Props> = ({ children, cardResponse }) => {
	const value = useCardUseCase({ initialData: cardResponse });
	return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export function useCardContext(): UseCardUseCaseType {
	const context = useContext(CardContext);
	if (!context) {
		throw new Error('useCardContext must be used within an CardContextProvider');
	}

	return context;
}
