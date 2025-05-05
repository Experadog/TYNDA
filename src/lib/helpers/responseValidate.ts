import type { CommonResponse } from '@common';

export function isSuccessResponse(response: unknown): response is CommonResponse<unknown> {
	return (
		!!response &&
		typeof response === 'object' &&
		'code' in response &&
		(response as CommonResponse<unknown>).code === 200
	);
}
