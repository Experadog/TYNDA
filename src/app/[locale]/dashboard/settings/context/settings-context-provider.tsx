'use client';

import type { PageSettings } from '@common';
import { type FC, type ReactNode, createContext, useContext } from 'react';
import { type UseSettingsUseCaseType, useSettingsUseCase } from '../use-cases/useSettingsUseCase';

type Props = {
	children: ReactNode;
	settings: PageSettings;
};

const SettingsContext = createContext<UseSettingsUseCaseType | null>(null);

export const SettingsContextProvider: FC<Props> = ({ children, settings }) => {
	const value = useSettingsUseCase(settings);

	return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export function useSettingContext(): UseSettingsUseCaseType {
	const context = useContext(SettingsContext);
	if (!context) {
		throw new Error('useSettingContext must be used within an SettingsContextProvider');
	}

	return context;
}
