import { ESTABLISHMENTS_CATEGORIES, type EstablishmentCategory } from '@business-entities';
import type { Params, REGION_KEY } from '@common';
import { REGIONS } from './common';

export const SEARCH_PARAMS: Partial<
	Record<keyof Params, { key: keyof Params; validate: (value: unknown) => boolean }>
> = {
	category: {
		key: 'category' as const,
		validate: (value: unknown): value is EstablishmentCategory => {
			return (
				typeof value === 'string' &&
				Object.values(ESTABLISHMENTS_CATEGORIES).includes(value as EstablishmentCategory)
			);
		},
	},

	id: {
		key: 'id' as const,
		validate: (value: unknown): value is string => {
			return typeof value === 'string' && value.trim().length > 0;
		},
	},

	search_name: {
		key: 'search_name' as const,
		validate: (value: unknown): value is string => {
			return typeof value === 'string' && value.trim().length > 0;
		},
	},

	region: {
		key: 'region' as const,
		validate: (value: unknown): value is REGION_KEY => {
			return (
				typeof value === 'string' && Object.values(REGIONS).includes(value as REGION_KEY)
			);
		},
	},

	sort_by_average_bill: {
		key: 'sort_by_average_bill' as const,
		validate: (value: unknown): value is 1 | -1 => {
			return typeof value === 'string' && (value === '1' || value === '-1');
		},
	},

	max_average_bill: {
		key: 'max_average_bill' as const,
		validate: (value: unknown): value is string => {
			return typeof value === 'string';
		},
	},

	min_average_bill: {
		key: 'min_average_bill' as const,
		validate: (value: unknown): value is string => {
			return typeof value === 'string';
		},
	},

	has_discount: {
		key: 'has_discount' as const,
		validate: (value: unknown): value is boolean => {
			if (typeof value !== 'string') return false;

			try {
				const parsed = JSON.parse(value);
				return typeof parsed === 'boolean';
			} catch {
				return false;
			}
		},
	},

	from_user_distance_in_meter: {
		key: 'from_user_distance_in_meter' as const,
		validate: (value: unknown): value is number => {
			if (typeof value !== 'string') return false;

			try {
				const parsed = JSON.parse(value);
				return typeof parsed === 'number';
			} catch {
				return false;
			}
		},
	},

	lat: {
		key: 'lat' as const,
		validate: (value: unknown): value is number => {
			if (typeof value !== 'string') return false;

			const num = Number(value);
			return !Number.isNaN(num) && num >= -90 && num <= 90;
		},
	},

	lon: {
		key: 'lon' as const,
		validate: (value: unknown): value is number => {
			if (typeof value !== 'string') return false;

			const num = Number(value);
			return !Number.isNaN(num) && num >= -180 && num <= 180;
		},
	},
} as const;

export type SearchParamsType = Record<string, string | string[] | undefined>;

export function parseSearchParams(params: Record<string, unknown>): Params {
	const tempResult: {
		[key: string]: unknown;
	} = {};

	for (const key of Object.keys(SEARCH_PARAMS) as Array<keyof typeof SEARCH_PARAMS>) {
		const config = SEARCH_PARAMS[key];
		if (!config) return {};
		const rawValue = params[config.key];

		if (typeof rawValue === 'string' && config.validate(rawValue)) {
			tempResult[key] = rawValue;
		}
	}

	return tempResult as Params;
}
