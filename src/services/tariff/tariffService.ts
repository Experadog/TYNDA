'use server';

import { createFetchAction } from '@/common/actions/createFetchAction';
import { URL_ENTITIES } from '@/lib';
import { AXIOS_DELETE, AXIOS_PATCH, AXIOS_POST, type Params } from '@common';
import type {
	TariffCreationRequestModel,
	TariffCreationResponseModel,
	TariffDeletionResponseModel,
	TariffListRetrievalResponseModel,
	TariffUpdatingRequestModel,
	TariffUpdatingResponseModel,
} from './tariffServiceTypes';

class TariffService {
	static async getTariffList(params?: Params): Promise<TariffListRetrievalResponseModel> {
		const response = await createFetchAction<TariffListRetrievalResponseModel>({
			endpoint: URL_ENTITIES.TARIFF_CLIENT_ALL,
			shouldBeAuthorized: false,
			revalidateTags: [URL_ENTITIES.TARIFF_CLIENT_ALL],
			params,
		});

		return response;
	}

	static async getAdminTariffList(params?: Params): Promise<TariffListRetrievalResponseModel> {
		const response = await createFetchAction<TariffListRetrievalResponseModel>({
			endpoint: URL_ENTITIES.TARIFF_ALL,
			shouldBeAuthorized: true,
			revalidateTags: [URL_ENTITIES.TARIFF_ALL],
			params,
		});

		return response;
	}

	static async createTariff(
		data: TariffCreationRequestModel,
	): Promise<TariffCreationResponseModel> {
		const response = await AXIOS_POST<TariffCreationResponseModel>({
			url: URL_ENTITIES.TARIFF,
			data,
		});

		return response;
	}

	static async deleteTariff(params: Params): Promise<TariffDeletionResponseModel> {
		const response = await AXIOS_DELETE<TariffDeletionResponseModel>({
			url: `${URL_ENTITIES.TARIFF}/${params.id}`,
		});

		return response;
	}

	static async updateTariff({
		id,
		payload,
	}: TariffUpdatingRequestModel): Promise<TariffUpdatingResponseModel> {
		const response = AXIOS_PATCH<TariffUpdatingResponseModel>({
			url: `${URL_ENTITIES.TARIFF}/${id}`,
			data: payload,
		});

		return response;
	}
}

export const { getTariffList, createTariff, getAdminTariffList, deleteTariff, updateTariff } =
	TariffService;
