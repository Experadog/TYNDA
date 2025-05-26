import type { PermissionScopeKey } from '@business-entities';

export type Params = {
	page?: string;
	size?: string;
	email?: string;
	code?: string;
	role?: string;
	state?: Locale;
	category?: string;
	id?: string;
	format?: string;
	limit?: string;
	q?: string;
	scope?: PermissionScopeKey;
	staff_establishment_id?: string;
};
