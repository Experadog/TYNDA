import type { EstablishmentCategory, PermissionScopeKey, UserRole } from '@business-entities';

export type Params = {
	page?: string;
	size?: string;
	email?: string;
	code?: string;
	role?: UserRole;
	state?: Locale;
	category?: EstablishmentCategory;
	id?: string;
	format?: string;
	limit?: string;
	q?: string;
	scope?: PermissionScopeKey;
	staff_establishment_id?: string;
	establisher_id?: string;
	request_id?: string;
	establishment_id?: string;
	chat_id?: string;
	user_id?: string;
	search_name?: string;
};
