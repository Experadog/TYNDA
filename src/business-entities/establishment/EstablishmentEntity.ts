import type { EntityStatus, SocialMediaKey, Translations } from '@common';

type EstablishmentTranslates = {
	name: string;
	description: string;
};

type Contacts = Omit<Record<SocialMediaKey, string>, 'phone'> & { phone: string[] };

type Coordinates = { latitude: number; longitude: number };

export type EstablishmentDetailed = {
	translates: Translations<EstablishmentTranslates>;
	name: string;
	address: string;
	coordinates: Coordinates;
	contacts: Contacts;
	website: string;
	email: string;
	status: EntityStatus;
	discount: number;
	average_bill: number;
	work_time: string;
	id: string;
	category: EstablishmentCategory;
	images: string[];
	cover: string;
};

export type EstablishmentDetailedDefaultValue = {
	name: string;
	address: string;
	category: undefined;
	contacts: Partial<Contacts>;
	coordinates: Partial<Coordinates>;
	translates: Partial<Translations<EstablishmentTranslates>>;
	website: string;
	email: string;
	average_bill: undefined;
	work_time_start: string;
	work_time_end: string;
	images: Array<never>;
	cover: undefined;
	discount: undefined;
	establisher: undefined;
	establisher_id: undefined;
};

export type EstablishmentListItem = {
	translates: Translations<EstablishmentTranslates>;
	id: string;
	category: EstablishmentCategory;
	status: EntityStatus;
	discount: number;
	cover: string;
	average_bill: number;
};

export const ESTABLISHMENTS_CATEGORIES = {
	accommodation: 'accommodation',
	nutrition: 'nutrition',
	rent: 'rent',
	health_and_beauty: 'health_and_beauty',
	shopping_and_souvenirs: 'shopping_and_souvenirs',
	culture_and_history: 'culture_and_history',
	events_and_entertainment: 'events_and_entertainment',
	for_family_vacations: 'for_family_vacations',
	ski_resorts: 'ski_resorts',
	discount: 'discount',
	banquet_halls: 'banquet_halls',
	tourist_attractions_and_routes: 'tourist_attractions_and_routes',
	transfer: 'transfer',
	tour_company: 'tour_company',
	guides: 'guides',
} as const;

export type EstablishmentCategory = keyof typeof ESTABLISHMENTS_CATEGORIES;

export type EstablishmentMap = {
	translates: Translations<Pick<EstablishmentTranslates, 'name'>>;
	id: string;
	category: EstablishmentCategory;
	coordinates: Coordinates;
	is_favorite: boolean;
};
