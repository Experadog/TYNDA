import type { Card } from '@business-entities';
import type { CardFormValues, CommonResponse, Paginated } from '@common';

export type CardListRetrievalResponseModel = CommonResponse<Paginated<Card>>;
export type UserCardRetrievalResponseModel = CommonResponse<Card>;

export type CardUpdatingRequestModel = {
	payload: CardFormValues;
	cardID: string;
};
export type CardUpdatingResponseModel = CommonResponse<string>;
