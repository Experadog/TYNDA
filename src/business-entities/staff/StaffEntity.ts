import type { EntityStatus } from '@common';

export type Staff = {
	email: string;
	password: string;
	permission_groups: string[];
	first_name: string;
	last_name: string;
	staff_establishment_id: string;
	avatar: string | null;
	created_time: string;
	id: string;
	status: EntityStatus;
	is_multi_login: boolean;
	is_staff: boolean;
	last_login_time: string | null;
};
