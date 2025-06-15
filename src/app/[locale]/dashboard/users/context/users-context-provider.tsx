'use client';

import type { UsersRetrievalResponseModel } from '@/services';
import { type FC, type ReactNode, createContext, useContext } from 'react';
import { type UseUsersUseCaseType, useUserUseCase } from '../use-cases/useUsersUseCase';

type Props = {
	children: ReactNode;
	allUsersResponse: UsersRetrievalResponseModel;
	establisherOnlyResponse: UsersRetrievalResponseModel;
};

const UsersContext = createContext<UseUsersUseCaseType | null>(null);

export const UsersContextProvider: FC<Props> = ({
	children,
	allUsersResponse,
	establisherOnlyResponse,
}) => {
	const value = useUserUseCase({
		tableData: allUsersResponse.data,
		selectionData: establisherOnlyResponse.data,
	});

	return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
};

export function useUsersContext(): UseUsersUseCaseType {
	const context = useContext(UsersContext);
	if (!context) {
		throw new Error('useUsersContext must be used within an UsersContextProvider');
	}

	return context;
}
