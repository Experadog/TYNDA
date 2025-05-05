'use client';

import type { FC, ReactNode } from 'react';
import { createContext, useContext } from 'react';
import {
	type UseEstablishmentUseCaseType,
	useEstablishmentUseCase,
} from '../(establishments)/use-case/useEstablishmentsUseCase';

type DashboardContextType = {
	useCases: {
		establishment: UseEstablishmentUseCaseType;
	};
};

type ContextProps = {
	children: ReactNode;
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardContextProvider: FC<ContextProps> = ({ children }) => {
	const establishmentUseCase = useEstablishmentUseCase();

	return (
		<DashboardContext.Provider value={{ useCases: { establishment: establishmentUseCase } }}>
			{children}
		</DashboardContext.Provider>
	);
};

export const useDashboardUseCases = (): DashboardContextType => {
	const context = useContext(DashboardContext);
	if (!context) {
		throw new Error('useDashboardUseCases must not be used within a DashboardContextProvider');
	}

	return context;
};
