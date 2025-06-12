import type { Tariff } from '@business-entities';
import type { CommonResponse, Paginated } from '@common';

export type TariffListRetrievalResponseModel = CommonResponse<Paginated<Tariff>>;

export type TariffCreationResponseModel = CommonResponse<string>;
export type TariffCreationRequestModel = Omit<Tariff, 'id'>;

export type TariffDeletionResponseModel = CommonResponse<string>;

export type TariffUpdatingRequestModel = { payload: Partial<Tariff>; id: string };
export type TariffUpdatingResponseModel = CommonResponse<string>;
