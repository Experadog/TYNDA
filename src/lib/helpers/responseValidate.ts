import type { MaybeSuccessOpenRoutePathResponse } from '@/business-entities/external/open-route/OpenRouteEntities';
import type { ExternalEntities } from '@business-entities';
import type { CommonResponse } from '@common';

export function isSuccessResponse(response: unknown): response is CommonResponse<unknown> {
	return (
		!!response &&
		typeof response === 'object' &&
		'code' in response &&
		(response as CommonResponse<unknown>).code === 200
	);
}

export function isCommonResponse<T>(response: unknown): response is CommonResponse<T> {
	return (
		(typeof response === 'object' &&
			response !== null &&
			'code' in response &&
			typeof (response as { code: unknown }).code === 'number' &&
			'msg' in response &&
			typeof (response as { msg: unknown }).msg === 'string') ||
		typeof (response as { msg: unknown }).msg === 'undefined'
	);
}
export function isSuccessOpenRoutePathResponse(
	data: unknown,
): data is ExternalEntities['Direction'] {
	const maybe = data as MaybeSuccessOpenRoutePathResponse;

	return (
		typeof maybe === 'object' &&
		maybe !== null &&
		maybe.type === 'FeatureCollection' &&
		Array.isArray(maybe.features) &&
		maybe.features.length > 0
	);
}
