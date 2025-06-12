import type { EntityStatus, Translations } from '@common';
import type { CardVariants } from '../card/CardEntity';

export type TariffTranslations = {
	name: string;
	description: string[];
};

export type Tariff = {
	translates: Translations<TariffTranslations>;
	card_type: CardVariants;
	status: EntityStatus;
	price: number;
	id: string;
};

export type DefaultTariffValues = {
	translates: Partial<Tariff['translates']>;
	card_type: undefined;
	status: EntityStatus;
	price: undefined;
};
