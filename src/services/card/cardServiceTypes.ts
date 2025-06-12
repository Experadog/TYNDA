import type { Card } from '@business-entities';
import type { CommonResponse, Paginated } from '@common';

export type CardListRetrievalResponseModel = CommonResponse<Paginated<Card>>;
export type UserCardRetrievalResponseModel = CommonResponse<Card>;
