'use server';

import { createFetchAction } from '@/common/actions/createFetchAction';
import { URL_ENTITIES } from '@/lib';
import { AXIOS_POST, type Params } from '@common';
import type {
	UserCreationRequestModel,
	UserCreationResponseModel,
	UsersRetrievalResponseModel,
} from './userServiceTypes';

class UserService {
	static async getUsers(params: Params): Promise<UsersRetrievalResponseModel> {
		const response = await createFetchAction<UsersRetrievalResponseModel>({
			endpoint: URL_ENTITIES.USERS,
			shouldBeAuthorized: true,
			params,
			revalidateTags: [URL_ENTITIES.USERS],
		});

		return response;
	}

	static async createUser(data: UserCreationRequestModel): Promise<UserCreationResponseModel> {
		const response = await AXIOS_POST<UserCreationResponseModel>({
			url: URL_ENTITIES.CREATE_USER_ADMIN,
			data,
		});

		return response;
	}
}

export const { getUsers, createUser } = UserService;
