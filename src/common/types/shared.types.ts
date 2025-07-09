import type { SupportedLanguages } from '@/i18n/routing';
import type { REGIONS, SOCIAL_MEDIAS } from '@/lib';
import type { IconType } from 'react-icons/lib';

export type EntityStatus = 'enable' | 'disable';
export enum EntityStatusEnum {
	ENABLE = 'enable',
	DISABLE = 'disable',
}

export type Translations<T> = {
	[L in SupportedLanguages]: T;
};

export type SocialMediaKey = keyof typeof SOCIAL_MEDIAS;
export type REGION_KEY = keyof typeof REGIONS;

export type SocialMedia = {
	title: SocialMediaKey;
	value?: string;
};

export interface Crumb {
	label: string;
	href: string;
}

export type UniversalListItem<T> = {
	title: string;
	icon: IconType;
	value: T;
};
