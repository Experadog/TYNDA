'use client';

import type { StaffRetrievalResponseModel } from '@/services';
import { type FC, type ReactNode, createContext, useContext } from 'react';
import { type UseStaffUseCaseTypes, useStaffUseCase } from '../use-cases/useStaffUseCase';

type Props = {
	children: ReactNode;
	staff: StaffRetrievalResponseModel['data'];
};

const StaffContext = createContext<UseStaffUseCaseTypes | null>(null);

export const StaffContextProvider: FC<Props> = ({ children, staff }) => {
	const value = useStaffUseCase({ staff });

	return <StaffContext.Provider value={value}>{children}</StaffContext.Provider>;
};

export function useStaffContext(): UseStaffUseCaseTypes {
	const context = useContext(StaffContext);
	if (!context) {
		throw new Error('useStaffContext must be used within an StaffContextProvider');
	}

	return context;
}
