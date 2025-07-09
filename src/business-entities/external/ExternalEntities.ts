import type { OpenRouteAddressResponse, OpenRouteResponse } from './open-route/OpenRouteEntities';
import type { OpenStreetDataItemType } from './openstreet-map/OpenstreetMapEntities';

// Structured
export type ExternalEntities = {
	OpenStreetMapDataItem: OpenStreetDataItemType;
	Direction: OpenRouteResponse;
	Address: OpenRouteAddressResponse;
};

// Common
export * from './leaflet/LeafletEntities';
export * from './open-route/OpenRouteEntities';
