'use server';

import { createFetchAction } from '@/common/actions/createFetchAction';
import { URL_ENTITIES } from '@/lib';
import type { Params } from '@common';
import type { GetUsersResponseModel } from './userServiceTypes';

class UserService {
	static async getUsers(params: Params): Promise<GetUsersResponseModel> {
		const response = await createFetchAction<GetUsersResponseModel>({
			endpoint: URL_ENTITIES.USERS,
			shouldBeAuthorized: true,
			params,
			revalidateTags: [URL_ENTITIES.USERS],
		});

		return response;
	}
}

export const { getUsers } = UserService;
