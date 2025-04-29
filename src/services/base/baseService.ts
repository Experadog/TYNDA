'use server';

import { URL_ENTITIES } from '@/lib';
import { AXIOS_POST } from '@common';
import type { LoadFileRequestModel, LoadFileResponseModel } from './baseServiceTypes';

class BaseService {
	static async loadFile(data: LoadFileRequestModel): Promise<LoadFileResponseModel> {
		const response = await AXIOS_POST<LoadFileResponseModel>({
			url: URL_ENTITIES.LOAD_FILE,
			data,
		});

		return response;
	}
}

export const { loadFile } = BaseService;
