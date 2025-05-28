'use server';

import { createFetchAction } from '@/common/actions/createFetchAction';
import { PAGES, URL_ENTITIES, isSuccessResponse } from '@/lib';
import { type Params, forceRedirect } from '@common';
import type { GetDetailedRolesResponseModel, GetRolesResponseModel } from './roleServiceTypes';

class RolesService {
	static async getRoles(params: Params): Promise<GetRolesResponseModel> {
		const response = await createFetchAction<GetRolesResponseModel>({
			endpoint: URL_ENTITIES.ROLES,
			shouldBeAuthorized: true,
			params,
			revalidateTags: [URL_ENTITIES.ROLES],
		});

		return response;
	}

	static async getDetailedRole(id: string) {
		const response = await createFetchAction<GetDetailedRolesResponseModel>({
			endpoint: URL_ENTITIES.ROLES,
			shouldBeAuthorized: true,
			postfix: [id],
			revalidateTags: [URL_ENTITIES.ROLES],
		});
		if (!isSuccessResponse(response)) {
			return await forceRedirect(PAGES.ROLES);
		}

		return response;
	}
}

export const { getRoles, getDetailedRole } = RolesService;
