import { OPENROUTE_KEY } from '@/lib';
import { type Params, createExternalFetchAction } from '@common';
import type {
	GETOpenStreetSearchResponseModel,
	GETOpenStreetSingleLocationResponseModal,
	OpenRouteAddressRetrievalRequestModel,
	OpenRouteAddressRetrievalResponseModel,
	OpenRouteNavigationPathRequestModel,
	OpenRouteNavigationPathResponseModel,
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

	static async getAddressByCoords({ lat, lon }: Pick<Params, 'lat' | 'lon'>) {
		const response = await createExternalFetchAction<GETOpenStreetSingleLocationResponseModal>({
			baseURLKey: 'STREET_MAP_API_URL',
			endpoint: '/reverse',
			params: { format: 'json', lat, lon },
		});

		return response;
	}

	static async getNavigationPath(
		request: OpenRouteNavigationPathRequestModel,
	): Promise<OpenRouteNavigationPathResponseModel> {
		const { from, to, transportMode = 'driving-car', options } = request;

		const response = await createExternalFetchAction<OpenRouteNavigationPathResponseModel>({
			method: 'POST',
			baseURLKey: 'OPENROUTE_API',
			endpoint: `/v2/directions/${transportMode}/geojson`,
			additionalHeaders: {
				Authorization: OPENROUTE_KEY || '',
				'Content-Type': 'application/json',
			},
			params: request.params,
			body: JSON.stringify({
				coordinates: [from, to],
				...(options && { options }),
			}),
		});

		return response;
	}

	static async getAddressReverse(
		request: OpenRouteAddressRetrievalRequestModel,
	): Promise<OpenRouteAddressRetrievalResponseModel> {
		const response = await createExternalFetchAction<OpenRouteAddressRetrievalResponseModel>({
			method: 'GET',
			baseURLKey: 'OPENROUTE_API',
			endpoint: '/geocode/reverse',
			additionalHeaders: {
				Authorization: OPENROUTE_KEY || '',
				'Content-Type': 'application/json',
			},
			params: {
				...request,
				'boundary.circle.radius': 1,
				size: 1,
			},
		});

		return response;
	}
}

export const { openStreetMapSearch, getAddressByCoords, getNavigationPath, getAddressReverse } =
	ExternalService;
