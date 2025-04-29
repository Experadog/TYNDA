import type { EntityStatus, Translations } from '@common';

type EstablishmentTranslates = {
	name: string;
	description: string;
};

export type EstablishmentDetailed = {
	translates: Translations<EstablishmentTranslates>;
	name: string;
	address: string;
	coordinates: string;
	contacts: {
		phone: string;
		telegram: string;
	};

	website: string;
	email: string;
	status: EntityStatus;
	average_bill: number;
	work_time: string;
	id: string;
	category: EstablishmentCategory;
	images: string[];
	cover: string;
};

export type EstablishmentListItem = {
	translates: Translations<EstablishmentTranslates>;
	id: string;
	category: string;
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
	transfer: 'transfer',
	tour_company: 'tour_company',
	guides: 'guides',
} as const;

export type EstablishmentCategory = keyof typeof ESTABLISHMENTS_CATEGORIES;
