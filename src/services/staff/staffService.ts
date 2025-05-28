'use server';

import { createFetchAction } from '@/common/actions/createFetchAction';
import { URL_ENTITIES } from '@/lib';
import { AXIOS_DELETE, AXIOS_PATCH, AXIOS_POST, type Params } from '@common';
import type {
	StaffCreationRequestModel,
	StaffCreationResponseModel,
	StaffDeletionRequestModel,
	StaffDeletionResponseModel,
	StaffRetrievalResponseModel,
	StaffUpdatingRequestModel,
	StaffUpdatingResponseModel,
} from './staffServiceTypes';

class StaffService {
	static async getStaff(params: Params): Promise<StaffRetrievalResponseModel> {
		const response = await createFetchAction<StaffRetrievalResponseModel>({
			endpoint: URL_ENTITIES.STAFF,
			shouldBeAuthorized: true,
			revalidateTags: [URL_ENTITIES.STAFF],
			params,
		});

		return response;
	}

	static async createStaff(data: StaffCreationRequestModel): Promise<StaffCreationResponseModel> {
		const response = await AXIOS_POST<StaffCreationResponseModel>({
			url: URL_ENTITIES.STAFF,
			data,
		});

		return response;
	}

	static async updateStaff({
		id,
		payload,
	}: StaffUpdatingRequestModel): Promise<StaffUpdatingResponseModel> {
		const response = await AXIOS_PATCH<StaffUpdatingResponseModel>({
			url: `${URL_ENTITIES.STAFF}/${id}`,
			data: payload,
		});

		return response;
	}

	static async deleteStaff(
		params: StaffDeletionRequestModel,
	): Promise<StaffDeletionResponseModel> {
		const response = await AXIOS_DELETE<StaffDeletionResponseModel>({
			url: `${URL_ENTITIES.STAFF}/${params.id}`,
		});

		return response;
	}
}

export const { getStaff, createStaff, updateStaff, deleteStaff } = StaffService;
