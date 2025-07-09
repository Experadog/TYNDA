export type OpenRouteStep = {
	distance: number;
	duration: number;
	instruction: string;
	type: number;
	way_points: [number, number];
};

export type OpenRouteSegment = {
	distance: number;
	duration: number;
	steps: OpenRouteStep[];
};

export type OpenRouteSummary = {
	distance: number;
	duration: number;
};

export type OpenRouteProperties = {
	segments: OpenRouteSegment[];
	summary: OpenRouteSummary;
};

export type OpenRouteGeometry = {
	type: 'LineString';
	coordinates: [number, number][];
};

export type OpenRouteFeature = {
	type: 'Feature';
	properties: OpenRouteProperties;
	geometry: OpenRouteGeometry;
};

export type OpenRouteResponse = {
	type: 'FeatureCollection';
	features: OpenRouteFeature[];
	bbox: [number, number, number, number];
	metadata: Record<string, unknown>;
};

export type OpenRouteTransportModeType =
	| 'driving-car'
	| 'cycling-regular'
	| 'foot-walking'
	| 'foot-hiking'
	| 'driving-hgv';

export enum OpenRouteTransportModeEnum {
	DRIVING_CAR = 'driving-car',
	CYCLING_REGULAR = 'cycling-regular',
	FOOT_WALKING = 'foot-walking',
	FOOT_HIKING = 'foot-hiking',
	DRIVING_HGV = 'driving-hgv',
}

export type OpenRoutePreparedType = {
	summary: OpenRouteSummary;
	segments: OpenRouteSegment[];
	coords: L.LatLng[];
	estID: string;
};

export type OpenRouteAddressLayer = 'address' | 'street' | 'country' | 'region' | 'venue';

export type OpenRoutePreparedAddress = {
	country?: string;
	street?: string;
	label?: string;
	confidence?: number;
	distance?: number;
	region?: string;
	continent?: string;
};

export interface OpenRouteAddressFeature extends Omit<OpenRouteFeature, 'properties'> {
	properties: OpenRoutePreparedAddress;
}

export type OpenRouteAddressResponse = {
	type: 'FeatureCollection';
	features: OpenRouteAddressFeature[];
	bbox: [number, number, number, number];
	metadata: Record<string, unknown>;
};

export type MaybeSuccessOpenRoutePathResponse = Partial<
	Pick<OpenRouteResponse, 'type' | 'features'>
>;

export type UserCoords = [number, number];
