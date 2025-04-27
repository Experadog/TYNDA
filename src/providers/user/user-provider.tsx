'use client';

import { decryptData } from '@/lib';
import type { User } from '@business-entities';
import type React from 'react';
import { type ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface UserContextType {
	user: User | null;
	setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{
	children: ReactNode;
	session: string;
}> = ({ children, session }) => {
	const [state, setState] = useState<User | null>(decryptData(session)?.user || null);

	const setUser = (newUser: User | null) => {
		setState(newUser);
	};

	useEffect(() => {
		setState(decryptData(session)?.user || null);
	}, [session]);

	return (
		<UserContext.Provider value={{ user: state, setUser: setUser }}>
			{children}
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
