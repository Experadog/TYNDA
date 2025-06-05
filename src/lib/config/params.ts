import { ESTABLISHMENTS_CATEGORIES, type EstablishmentCategory } from '@business-entities';

export const SEARCH_PARAMS = {
	category: {
		key: 'category' as const,
		values: Object.values(ESTABLISHMENTS_CATEGORIES),
		validate: (value: unknown): value is EstablishmentCategory => {
			return (
				typeof value === 'string' &&
				Object.values(ESTABLISHMENTS_CATEGORIES).includes(value as EstablishmentCategory)
			);
		},
	},
} as const;

type ValidatedParams = {
	[K in keyof typeof SEARCH_PARAMS]?: (typeof SEARCH_PARAMS)[K] extends {
		validate: (value: unknown) => value is infer R;
	}
		? R
		: never;
};

export type SearchParamsType = Record<string, string | string[] | undefined>;

export function parseSearchParams(params: Record<string, unknown>): ValidatedParams {
	const tempResult: {
		[key: string]: unknown;
	} = {};

	for (const key of Object.keys(SEARCH_PARAMS) as Array<keyof typeof SEARCH_PARAMS>) {
		const config = SEARCH_PARAMS[key];
		const rawValue = params[config.key];

		if (typeof rawValue === 'string' && config.validate(rawValue)) {
			tempResult[key] = rawValue;
		}
	}

	return tempResult as ValidatedParams;
}
