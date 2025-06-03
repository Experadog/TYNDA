import type { SupportedLanguages } from '@/i18n/routing';
import type { SOCIAL_MEDIAS } from '@/lib';

export type EntityStatus = 'enable' | 'disable';

export type Translations<T> = {
	[L in SupportedLanguages]: T;
};

export type SocialMediaKey = keyof typeof SOCIAL_MEDIAS;

export type SocialMedia = {
	title: SocialMediaKey;
	value?: string;
};

export interface Crumb {
	label: string;
	href: string;
}

// Breadcrumbs
export type NestedValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
	? K extends keyof T
		? NestedValue<T[K], Rest>
		: unknown
	: P extends keyof T
		? T[P]
		: unknown;

export type Join<K, P> = K extends string ? (P extends string ? `${K}.${P}` : never) : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, ...0[]];

export type Paths<T, D extends number = 3> = [D] extends [never]
	? never
	: T extends object
		? {
				[K in Extract<keyof T, string>]: T[K] extends object
					? K | Join<K, Paths<T[K], Prev[D]>>
					: K;
			}[Extract<keyof T, string>]
		: '';

export type ValueTypeFrom<T> = Paths<T>;

type Path<T> = T extends object
	? {
			[K in keyof T & string]: T[K] extends object ? `${K}` | `${K}.${Path<T[K]>}` : `${K}`;
		}[keyof T & string]
	: never;

export type AsyncPageRule<T> = {
	isAsyncData: true;
	data: T[];
	path: string;
	rules: [Path<T>, Path<T> | Path<T>[]];
};

// Page Setting
export type PageSettings = {
	isGrayscale: boolean;
	fontSize: 'small' | 'medium' | 'large';
	isUnderlineLinks: boolean;
	borderRadius: 'none' | 'medium' | 'large';
};
