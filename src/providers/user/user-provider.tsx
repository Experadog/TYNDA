'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { useRouter } from '@/i18n/routing';
import { PAGES, decryptData } from '@/lib';
import { type LogoutResponseModel, logout } from '@/services';
import type { Session, User } from '@business-entities';
import { createAction, useAsyncAction } from '@common';
import type React from 'react';
import { type ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';

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
	const initialUser = useMemo(() => decryptData<Session>(session)?.user || null, [session]);
	const [user, setUser] = useState<User | null>(initialUser);

	useEffect(() => {
		if (initialUser) {
			setUser(initialUser);
		}
	}, [initialUser]);

	const router = useRouter();

	const { Logout } = useViewModel(['Toast']);
	const { execute: logoutExecute } = useAsyncAction<LogoutResponseModel, []>({
		messages: Logout,
	});

	const logoutAction = createAction({
		requestAction: logout,
		onSuccess: () => {
			router.push(PAGES.LOGIN);
			setTimeout(() => {
				setUser(null);
			}, 300);
		},
	});

	const onLogout = async () => {
		await logoutExecute(logoutAction);
	};

	return (
		<UserContext.Provider value={{ user, setUser, onLogout }}>{children}</UserContext.Provider>
	);
};

export const useUser = (): UserContextType => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};
