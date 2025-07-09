import type {
	ExternalEntities,
	OpenRouteAddressLayer,
	OpenRouteTransportModeEnum,
	OpenRouteTransportModeType,
} from '@business-entities';

export type GETOpenStreetSearchResponseModel = Promise<ExternalEntities['OpenStreetMapDataItem'][]>;
export type GETOpenStreetSingleLocationResponseModal = Promise<
	ExternalEntities['OpenStreetMapDataItem']
>;

export type OpenRouteNavigationPathRequestModel = {
	from: [number, number];
	to: [number, number];
	transportMode?: OpenRouteTransportModeEnum | OpenRouteTransportModeType;
	options?: Record<string, unknown>;
	params?: Record<string, unknown>;
};

export type OpenRouteNavigationPathResponseModel = ExternalEntities['Direction'];

export type OpenRouteAddressRetrievalRequestModel = {
	'point.lon': number;
	'point.lat': number;
	layers: OpenRouteAddressLayer[];
};

export type OpenRouteAddressRetrievalResponseModel = ExternalEntities['Address'];
