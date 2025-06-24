import type { EntityStatus, Translations } from '@common';

export const PERMISSION_SCOPES = {
	user: 'user',
	establishment: 'establishment',
	permission: 'permission',
} as const;

export const PERM = {
	C: 'c',
	R: 'r',
	U: 'u',
	D: 'd',
} as const;

export type PermissionScope = typeof PERMISSION_SCOPES;
export type PermissionScopeKey = keyof PermissionScope;

export type Perm = typeof PERM;
export type PermKey = keyof Perm;

type RolesTranslates = {
	name: string;
	description: string;
};

export type Role = {
	translates: Translations<RolesTranslates>;
	status: EntityStatus;
	id: string;
};

export type Permission = {
	translates: Translations<RolesTranslates>;
	status: EntityStatus;
	id: string;
	scope: PermissionScopeKey;
	perm: Partial<'crud'>;
};

export type RoleDetailed = Role & { permissions: Permission[] };

// Local Permissions

export type PermissionValue = Partial<'crud'>;

export type PermissionManagerType = Partial<{
	establishment: PermissionValue;
	user: PermissionValue;
	card: PermissionValue;
}>;

export type PermissionModule = 'establishment' | 'user' | 'card';

export const PermissionActionMap = {
	CREATE: 'c',
	READ: 'r',
	UPDATE: 'u',
	DELETE: 'd',
} as const;

export type PermissionAction = keyof typeof PermissionActionMap;
