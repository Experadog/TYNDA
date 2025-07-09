'use server';

import { createFetchAction } from '@/common/actions/createFetchAction';
import { PAGES, URL_ENTITIES, isSuccessResponse } from '@/lib';
import {
	AXIOS_DELETE,
	AXIOS_PATCH,
	AXIOS_POST,
	type Params,
	forceRedirect,
	isSuperUser,
} from '@common';
import type {
	EstablishmentAdminCreationRequestModel,
	EstablishmentClientRetrievalResponseModel,
	EstablishmentCreationRequestModel,
	EstablishmentCreationResponseModel,
	EstablishmentDeletionRequestModel,
	EstablishmentMapRetrieval,
	EstablishmentRetrievalDetailedResponseModel,
	EstablishmentUpdatingRequestModel,
	EstablishmentUpdatingResponseModel,
} from './establishmentServiceTypes.ts';

class EstablishmentService {
	static async getEstablishmentAllClient(
		params: Params,
	): Promise<EstablishmentClientRetrievalResponseModel> {
		const response = await createFetchAction<EstablishmentClientRetrievalResponseModel>({
			endpoint: URL_ENTITIES.ESTABLISHMENT_ALL_CLIENT,
			shouldBeAuthorized: false,
			params,
			body:
				params?.lat && params?.lon
					? JSON.stringify({
							latitude: params?.lat,
							longitude: params?.lon,
						})
					: undefined,
			method: 'POST',
			revalidateTags: [URL_ENTITIES.ESTABLISHMENT_ALL_CLIENT],
		});

		return response;
	}

	static async getEstablishmentAllAdmin(params: Params) {
		const response = await createFetchAction<EstablishmentClientRetrievalResponseModel>({
			endpoint: URL_ENTITIES.ESTABLISHMENT_ALL_ADMIN,
			shouldBeAuthorized: true,
			params,
			method: 'POST',
			revalidateTags: [URL_ENTITIES.ESTABLISHMENT_ALL_ADMIN],
		});

		return response;
	}

	static async getEstablishmentAllEstablisher(
		params: Params,
	): Promise<EstablishmentClientRetrievalResponseModel> {
		const response = await createFetchAction<EstablishmentClientRetrievalResponseModel>({
			endpoint: URL_ENTITIES.ESTABLISHMENT_ALL_ESTABLISHER,
			shouldBeAuthorized: true,
			params,
			revalidateTags: [URL_ENTITIES.ESTABLISHMENT_ALL_ESTABLISHER],
		});

		return response;
	}

	static async getEstablishmentDetail(
		id: string,
		isDashboard = false,
	): Promise<EstablishmentRetrievalDetailedResponseModel> {
		const response = await createFetchAction<EstablishmentRetrievalDetailedResponseModel>({
			endpoint: URL_ENTITIES.ESTABLISHMENT_DETAIL,
			postfix: [id],
			shouldBeAuthorized: false,
			revalidateTags: [URL_ENTITIES.ESTABLISHMENT_DETAIL],
		});

		if (!isSuccessResponse(response)) {
			await forceRedirect(isDashboard ? PAGES.DASHBOARD : PAGES.ENTERPRISES_ALL);
		}

		console.log(response.data.establishment.contacts);

		return response;
	}

	static async createEstablishment(
		data: EstablishmentCreationRequestModel | EstablishmentAdminCreationRequestModel,
		params?: Params,
	): Promise<EstablishmentCreationResponseModel> {
		const url = (await isSuperUser())
			? URL_ENTITIES.ESTABLISHMENT_CREATION_ADMIN
			: URL_ENTITIES.ESTABLISHMENT;

		console.log(data, params);

		const response = await AXIOS_POST<EstablishmentCreationResponseModel>({
			url,
			data,
			params,
		});

		return response;
	}

	static async deleteEstablishment(
		data: EstablishmentDeletionRequestModel,
	): Promise<EstablishmentCreationResponseModel> {
		const response = await AXIOS_DELETE<EstablishmentCreationResponseModel>({
			url: `${URL_ENTITIES.ESTABLISHMENT}/${data.id}`,
		});

		return response;
	}

	static async updateEstablishment(
		data: EstablishmentUpdatingRequestModel,
	): Promise<EstablishmentUpdatingResponseModel> {
		const response = await AXIOS_PATCH<EstablishmentUpdatingResponseModel>({
			url: `${URL_ENTITIES.ESTABLISHMENT}/${data.id}`,
			data: data.payload,
		});

		return response;
	}

	static async getEstablishmentAllMap(params?: Params): Promise<EstablishmentMapRetrieval> {
		const response = await createFetchAction<EstablishmentMapRetrieval>({
			endpoint: URL_ENTITIES.ESTABLISHMENT_ALL_MAP,
			shouldBeAuthorized: false,
			params,
			body:
				params?.lat && params?.lon
					? JSON.stringify({
							latitude: params?.lat,
							longitude: params?.lon,
						})
					: undefined,

			method: 'POST',
			revalidateTags: [URL_ENTITIES.ESTABLISHMENT_ALL_MAP],
		});

		return response;
	}
}

export const {
	getEstablishmentAllClient,
	getEstablishmentDetail,
	createEstablishment,
	getEstablishmentAllAdmin,
	getEstablishmentAllEstablisher,
	deleteEstablishment,
	updateEstablishment,
	getEstablishmentAllMap,
} = EstablishmentService;
