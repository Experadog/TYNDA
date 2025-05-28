'use server';

import { createFetchAction } from '@/common/actions/createFetchAction';
import { PAGES, URL_ENTITIES, isSuccessResponse } from '@/lib';
import { AXIOS_DELETE, AXIOS_PATCH, AXIOS_POST, type Params, isSuperUser } from '@common';
import { permanentRedirect } from 'next/navigation.js';
import type {
	EstablishmentAdminCreationRequestModel,
	EstablishmentCreationRequestModel,
	EstablishmentCreationResponseModel,
	EstablishmentDeletionRequestModel,
	EstablishmentUpdatingRequestModel,
	EstablishmentUpdatingResponseModel,
	GetEstablishmentAllClientResponseModel,
	GetEstablishmentDetailedResponseModel,
} from './establishmentServiceTypes.ts';

class EstablishmentService {
	static async getEstablishmentAllClient(
		params: Params,
	): Promise<GetEstablishmentAllClientResponseModel> {
		const response = await createFetchAction<GetEstablishmentAllClientResponseModel>({
			endpoint: URL_ENTITIES.ESTABLISHMENT_ALL_CLIENT,
			shouldBeAuthorized: false,
			params,
			revalidateTags: [URL_ENTITIES.ESTABLISHMENT_ALL_CLIENT],
		});

		return response;
	}

	static async getEstablishmentAll(params: Params) {
		const isSuper = await isSuperUser();

		const response = await createFetchAction<GetEstablishmentAllClientResponseModel>({
			endpoint: isSuper
				? URL_ENTITIES.ESTABLISHMENT_ALL_ADMIN
				: URL_ENTITIES.ESTABLISHMENT_ALL_ESTABLISHER,
			shouldBeAuthorized: true,
			params,
			revalidateTags: [
				URL_ENTITIES.ESTABLISHMENT_ALL_ESTABLISHER,
				URL_ENTITIES.ESTABLISHMENT_ALL_ADMIN,
			],
		});

		return response;
	}

	static async getEstablishmentDetail(
		id: string,
		isDashboard = false,
	): Promise<GetEstablishmentDetailedResponseModel> {
		const response = await createFetchAction<GetEstablishmentDetailedResponseModel>({
			endpoint: URL_ENTITIES.ESTABLISHMENT_DETAIL,
			postfix: [id],
			shouldBeAuthorized: false,
			revalidateTags: [URL_ENTITIES.ESTABLISHMENT_DETAIL],
		});

		if (!isSuccessResponse(response)) {
			permanentRedirect(isDashboard ? PAGES.DASHBOARD : PAGES.ENTERPRISES_ALL);
		}

		return response;
	}

	static async createEstablishment(
		data: EstablishmentCreationRequestModel | EstablishmentAdminCreationRequestModel,
		params?: Params,
	): Promise<EstablishmentCreationResponseModel> {
		const url = (await isSuperUser())
			? URL_ENTITIES.ESTABLISHMENT_CREATION_ADMIN
			: URL_ENTITIES.ESTABLISHMENT_CREATION;

		const response = await AXIOS_POST<EstablishmentCreationResponseModel>({
			url,
			data,
			params,
		});

		return response;
	}

	static async createAdminEstablishment() {}

	static async deleteEstablishment(
		data: EstablishmentDeletionRequestModel,
	): Promise<EstablishmentCreationResponseModel> {
		const response = await AXIOS_DELETE<EstablishmentCreationResponseModel>({
			url: `${URL_ENTITIES.ESTABLISHMENT_DELETION}/${data.id}`,
		});

		return response;
	}

	static async updateEstablishment(
		data: EstablishmentUpdatingRequestModel,
	): Promise<EstablishmentUpdatingResponseModel> {
		const response = await AXIOS_PATCH<EstablishmentUpdatingResponseModel>({
			url: `${URL_ENTITIES.ESTABLISHMENT_UPDATING}/${data.id}`,
			data: data.payload,
		});

		return response;
	}
}

export const {
	getEstablishmentAllClient,
	getEstablishmentDetail,
	createEstablishment,
	getEstablishmentAll,
	deleteEstablishment,
	updateEstablishment,
} = EstablishmentService;
