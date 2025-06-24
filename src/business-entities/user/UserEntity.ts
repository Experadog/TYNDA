import type { EntityStatus } from '@common';
import type { Card } from '../card/CardEntity';
import type { EstablishmentDetailed } from '../establishment/EstablishmentEntity';
import type { PermissionManagerType } from '../roles/RolesEntity';

export type User = {
	id: string;
	first_name?: string;
	last_name?: string;
	email: string;
	phone: string;
	status: EntityStatus;
	is_superuser: boolean;
	is_staff: boolean;
	is_multi_login: boolean;
	is_phone_verified: boolean;
	created_time: string;
	last_login_time: string;
	role: UserRole;
	avatar: string | null;
	card: Card;
	cached_permission_groups: PermissionManagerType;
	staff_establishment?: EstablishmentDetailed | null;
};

export type UserListItem = {
	first_name: string | null;
	last_name: string | null;
	avatar: string | null;
	id: string;
	email: string;
	status: EntityStatus;
	is_staff: boolean;
	is_multi_login: boolean;
	created_time: string;
	last_login_time: string | null;
	role: UserRole;
};

export enum UserRole {
	CLIENT = 'client',
	ESTABLISHER = 'establisher',
	ESTABLISHMENT_WORKER = 'establishment_worker',
}

export type Credentials = {
	access_token: string;
	access_token_type: string;
	access_token_expire_time: string;
	refresh_token: string;
	refresh_token_type: string;
	refresh_token_expire_time: string;
};

export type Session = {
	user: User;
	last_refreshed_time?: string;
} & Credentials;

export type BonusHistory = {
	image: string;
	title: string;
	category: string;
	location: string;
	date: string;
	discount: number;
};

export type UserReviews = {
	image: string;
	title: string;
	category: string;
	location: string;
	rating: number;
	text: string;
	date: string;
};
