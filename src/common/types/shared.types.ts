import type { SupportedLanguages } from '@/i18n/routing';

export type EntityStatus = 'enable' | 'disable';

export type Translations<T> = Partial<Record<SupportedLanguages, T>> & {
	[locale: string]: T;
};
