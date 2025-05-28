import type { Params } from '@common';

export type PaginationKeys = 'staff' | 'establishment' | 'role' | 'user';

export const PAGINATION: Record<PaginationKeys, Pick<Params, 'size' | 'page'>> = {
	staff: {
		page: '1',
		size: '2',
	},
	establishment: {
		page: '1',
		size: '20',
	},
	role: {
		page: '1',
		size: '20',
	},
	user: {
		page: '1',
		size: '20',
	},
} as const;
