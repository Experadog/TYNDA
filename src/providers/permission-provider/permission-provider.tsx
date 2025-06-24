'use client';

import { decryptData } from '@/lib';
import {
	type PermissionAction,
	PermissionActionMap,
	type PermissionManagerType,
	type PermissionModule,
	type PermissionValue,
	type Session,
} from '@business-entities';
import { type ReactNode, createContext, useContext, useMemo } from 'react';

type PermissionContextType = {
	permissions: PermissionManagerType;
	hasPermission: (module: PermissionModule, action: PermissionAction) => boolean;
};

const PermissionContext = createContext<PermissionContextType | null>(null);

interface PermissionProviderProps {
	children: ReactNode;
	session: string;
}

function parseSession(session: string): PermissionManagerType {
	try {
		const raw = decryptData<Session>(session);
		const groups = raw?.user?.cached_permission_groups;
		if (groups && typeof groups === 'object') {
			return groups;
		}
	} catch {}

	return {};
}

export const PermissionProvider: React.FC<PermissionProviderProps> = ({ session, children }) => {
	const permissions = useMemo<Partial<Record<string, PermissionValue>>>(
		() => parseSession(session),
		[session],
	);

	const hasPermission = useMemo(() => {
		return (module: PermissionModule, action: PermissionAction) => {
			const letter = PermissionActionMap[action];
			const perm = permissions[module];
			return perm?.includes(letter) ?? false;
		};
	}, [permissions]);

	return (
		<PermissionContext.Provider value={{ permissions, hasPermission }}>
			{children}
		</PermissionContext.Provider>
	);
};

export const usePermissions = () => {
	const context = useContext(PermissionContext);
	if (!context) {
		throw new Error('usePermissions must be used within a PermissionProvider');
	}
	return context;
};
