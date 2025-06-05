import type { Params } from '@common';

export type PaginationKeys = 'staff' | 'establishment' | 'role' | 'user' | 'chat';

export const PAGINATION: Record<PaginationKeys, Pick<Params, 'size' | 'page'>> = {
	staff: {
		page: '1',
		size: '20',
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
		size: '20',
	},

	chat: {
		page: '1',
		size: '30',
	},
} as const;
