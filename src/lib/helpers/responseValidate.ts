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
