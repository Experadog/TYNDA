import type { Params } from '@common';

export type PaginationKeys = 'staff' | 'establishment' | 'role' | 'user';

export const PAGINATION: Record<PaginationKeys, Pick<Params, 'size' | 'page'>> = {
	staff: {
		page: '1',
		size: '10',
	},
	establishment: {
		page: '1',
		size: '20',
	},

	role: {
		page: '1',
		size: '100',
	},
	user: {
		page: '1',
		size: '15',
	},
} as const;
