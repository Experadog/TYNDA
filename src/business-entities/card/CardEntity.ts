import type { EntityStatus } from '@common';
import type { Tariff } from '../tariff/tariffEntity';

export enum CardVariants {
	COMPATRIOT = 'compatriot',
	TOURIST = 'tourist',
}

export type Card = {
	id: string;
	expire_date: string;
	status: EntityStatus;
	tariff: Tariff;
};
