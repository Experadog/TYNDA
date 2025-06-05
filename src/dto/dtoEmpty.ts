import type { Paginated } from '@common';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const DTOEmptyPagination: Paginated<any> = {
	items: [],
	links: {
		first: '',
		last: '',
		self: '',
	},
	page: 1,
	size: 0,
	total: 0,
	total_pages: 0,
};
