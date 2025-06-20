import { createExternalFetchAction } from '@common';
import type { GETOpenStreetSearchResponseModel } from './externalServiceTypes';

export class ExternalService {
	static async openStreetMapSearch(query: string): GETOpenStreetSearchResponseModel {
		const response = await createExternalFetchAction<GETOpenStreetSearchResponseModel>({
			baseURLKey: 'STREET_MAP_API_URL',
			endpoint: '/search',
			params: { format: 'json', q: query, limit: '10' },
		});

		return response;
	}
}

export const { openStreetMapSearch } = ExternalService;
