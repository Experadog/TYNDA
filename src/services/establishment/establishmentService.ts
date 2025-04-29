'use server';

import { createFetchAction } from '@/common/actions/createFetchAction';
import { PAGES, URL_ENTITIES, isSuccessResponse } from '@/lib';
import type { Params } from '@common';
import { permanentRedirect } from 'next/navigation.js';
import type {
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
		});

		return response;
	}

	static async getEstablishmentDetail(
		id: string,
	): Promise<GetEstablishmentDetailedResponseModel> {
		const response = await createFetchAction<GetEstablishmentDetailedResponseModel>({
			endpoint: URL_ENTITIES.ESTABLISHMENT_DETAIL,
			postfix: [id],
			shouldBeAuthorized: false,
		});

		if (!isSuccessResponse(response)) {
			permanentRedirect(PAGES.ENTERPRISES_ALL);
		}

		return response;
	}
}

export const { getEstablishmentAllClient, getEstablishmentDetail } = EstablishmentService;
