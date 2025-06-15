'use client';

import type { TariffListRetrievalResponseModel } from '@/services';
import { type FC, type ReactNode, createContext, useContext } from 'react';
import { type UseTariffUseCaseType, useTariffUserCase } from '../use-cases/useTariffUseCase';

type Props = {
	children: ReactNode;
	tariffsResponse?: TariffListRetrievalResponseModel['data'];
};

const TariffContext = createContext<UseTariffUseCaseType | null>(null);

export const TariffContextProvider: FC<Props> = ({ children, tariffsResponse }) => {
	const value = useTariffUserCase({ tariffsResponse });
	return <TariffContext.Provider value={value}>{children}</TariffContext.Provider>;
};

export function useTariffContext(): UseTariffUseCaseType {
	const context = useContext(TariffContext);
	if (!context) {
		throw new Error('useTariffUserCase must be used within an TariffContextProvider');
	}

	return context;
}
