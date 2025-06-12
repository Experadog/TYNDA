import { type SupportedLanguages, supportedLanguages } from '@/i18n/routing';
import type { DefaultTariffValues } from '@business-entities';
import type { CommonResponse, Paginated, StaffFormValues } from '@common';

export const DTOEmptyTariffFields: DefaultTariffValues = {
	card_type: undefined,
	price: undefined,
	status: 'enable',
	translates: supportedLanguages.reduce(
		(acc, lang) => {
			acc[lang] = { name: '', description: [''] };
			return acc;
		},
		{} as Record<SupportedLanguages, { name: string; description: string[] }>,
	),
};

export const DTOStaffEmptyFields: StaffFormValues = {
	email_name: '',
	permission_groups: [],
	staff_establishment_id: '',
	first_name: '',
	last_name: '',
	password: '',
	avatar: '',
};

export function DTOEmptyCommonPagination<T>(): CommonResponse<Paginated<T>> {
	return {
		code: 500,
		data: {
			links: {
				first: '',
				last: '',
				self: '',
			},
			items: [],
			page: 0,
			size: 0,
			total: 0,
			total_pages: 0,
		},
		msg: 'Error handling DTO',
	};
}

export function DTOEmptyCommonResponse<T>(): CommonResponse<T> {
	return {
		code: 500,
		data: {} as T,
		msg: 'Error handling DTO',
	};
}
