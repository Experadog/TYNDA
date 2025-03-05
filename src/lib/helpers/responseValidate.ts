import { CommonResponse } from '@common';

export function isSuccessResponse(response: unknown): response is CommonResponse<any> {
    return !!response && typeof response === 'object' && 'code' in response && (response as CommonResponse<any>).code === 200;
}
