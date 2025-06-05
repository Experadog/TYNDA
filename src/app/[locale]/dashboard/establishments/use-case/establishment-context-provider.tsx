'use client';
import type { FC, ReactNode } from 'react';
import { createContext, useContext } from 'react';

import { DTOEmptyPagination } from '@/dto/dtoEmpty';
import type { GetEstablishmentAllClientResponseModel } from '@/services';
import {
	type UseEstablishmentUseCaseType,
	useEstablishmentUseCase,
} from './useEstablishmentsUseCase';

type Props = {
	establishments: GetEstablishmentAllClientResponseModel | undefined;
	children: ReactNode;
};

const EstablishmentContext = createContext<UseEstablishmentUseCaseType | undefined>(undefined);

export const EstablishmentContextProvider: FC<Props> = ({ establishments, children }) => {
	const value = useEstablishmentUseCase({
		establishments: establishments ? establishments.data : DTOEmptyPagination,
	});
	return <EstablishmentContext.Provider value={value}>{children}</EstablishmentContext.Provider>;
};

export function useEstablishmentContext(): UseEstablishmentUseCaseType {
	const context = useContext(EstablishmentContext);
	if (!context) {
		throw new Error(
			'useEstablishmentContext must be used within an EstablishmentContextProvider',
		);
	}
	return context;
}
