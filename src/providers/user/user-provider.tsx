'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { useRouter } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { type LogoutResponseModel, logout } from '@/services';
import type { User } from '@business-entities';
import { createAction, useAsyncAction, useSessionManager } from '@common';
import { Avatar, LoadingSpinner, Translate } from '@components';
import type React from 'react';
import { type ReactNode, createContext, useContext } from 'react';

interface UserContextType {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	onLogout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
	children: ReactNode;
	session: string;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children, session }) => {
	const { Logout } = useViewModel(['Toast']);
	const router = useRouter();

	const { user, setUser, isLoading } = useSessionManager(session);

	const { execute: logoutExecute } = useAsyncAction<LogoutResponseModel, []>({
		messages: Logout,
	});

	const logoutAction = createAction({
		requestAction: logout,
		onSuccess: () => router.push(PAGES.LOGIN),
	});

	const onLogout = async () => {
		await logoutExecute(logoutAction);
	};

	return (
		<UserContext.Provider value={{ user, setUser, onLogout }}>
			<>
				{children}
				<Translate
					direction="left"
					open={isLoading}
					distance={1000}
					animateOnce
					onExit={{ direction: 'right', delay: 0.2 }}
					className="fixed inset-0 flex flex-col gap-3 justify-center items-center z-[9999999] bg-background_6"
				>
					<Avatar src={'/logo.svg'} className="size-24 animate-pulse duration-500" />
					<h3 className="text-foreground_1 text-2xl font-semibold">Tynda KG</h3>
					<h4 className="text-foreground_2 text-md font-normal">Проверка сессии...</h4>
					<LoadingSpinner className="size-5 text-yellow" />
				</Translate>
			</>
		</UserContext.Provider>
	);
};

export const useUser = (): UserContextType => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};
