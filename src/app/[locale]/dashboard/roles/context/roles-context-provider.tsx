'use client';

import type { GetRolesResponseModel } from '@/services/roles/roleServiceTypes';
import { type FC, type ReactNode, createContext, useContext } from 'react';
import { type UseRolesUseCaseType, useRolesUseCase } from '../use-cases/useRolesUseCase';

type Props = {
	children: ReactNode;
	roles: GetRolesResponseModel | undefined;
};

const RolesContext = createContext<UseRolesUseCaseType | null>(null);

export const RolesContextProvider: FC<Props> = ({ children, roles }) => {
	if (!roles?.data) return <>{children}</>;

	const value = useRolesUseCase({ roles: roles.data });
	return <RolesContext.Provider value={value}>{children}</RolesContext.Provider>;
};

export function useRolesContext(): UseRolesUseCaseType {
	const context = useContext(RolesContext);
	if (!context) {
		throw new Error('useRolesContext must be used within an RolesContextProvider');
	}

	return context;
}
