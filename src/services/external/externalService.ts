import { URL_LOCAL_ENTITIES, decryptData, encryptData } from '@/lib';
import { createExternalFetchAction } from '@common';
import type {
	GETOpenStreetSearchResponseModel,
	TranslateRequestModel,
	TranslateResponseModel,
} from './externalServiceTypes';

export class ExternalService {
	static async openStreetMapSearch(query: string): GETOpenStreetSearchResponseModel {
		const response = await createExternalFetchAction<GETOpenStreetSearchResponseModel>({
			baseURLKey: 'STREET_MAP_API_URL',
			endpoint: '/search',
			params: { format: 'json', q: query, limit: '10' },
		});

		return response;
	}

	static async translateText(req: TranslateRequestModel): Promise<TranslateResponseModel> {
		const res = await fetch(`/api/${URL_LOCAL_ENTITIES.TRANSLATE}`, {
			method: 'POST',
			headers: { 'Content-Type': 'text/plain' },
			body: encryptData(req),
		});

		const data = await res.text();
		const decryptedData = decryptData<TranslateResponseModel>(data) || {
			text: 'Translation Error',
		};

		return decryptedData;
	}
}

export const { openStreetMapSearch, translateText } = ExternalService;
