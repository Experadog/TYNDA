import type {
	CardVariants,
	EstablishmentCategory,
	PermissionScopeKey,
	UserRole,
} from '@business-entities';
import type { REGION_KEY } from './shared.types';

export type SortVariant = 1 | -1;

export type Params = {
	page?: string;
	size?: string | number;
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
	card_type?: CardVariants;
	lat?: number;
	lon?: number;
	region?: REGION_KEY;
	has_discount?: boolean;
	sort_by_discount?: SortVariant;
	min_average_bill?: number;
	max_average_bill?: number;
	sort_by_average_bill?: SortVariant;
	from_user_distance_in_meter?: number;
};
