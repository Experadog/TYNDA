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
