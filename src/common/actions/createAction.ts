import { isCommonResponse, isSuccessResponse } from '@/lib';
import type { CommonResponse } from '../types/responses.types';

interface ActionFactoryOptions<TRequest, TResponse> {
	requestAction: (values: TRequest) => Promise<TResponse>;
	onSuccess?: (response: TResponse) => void;
	onError?: (error?: Error | CommonResponse<unknown>) => void;
}

export function createAction<TRequest, TResponse>({
	requestAction,
	onSuccess,
	onError,
}: ActionFactoryOptions<TRequest, TResponse>) {
	return async (values: TRequest): Promise<TResponse> => {
		try {
			const response = await requestAction(values);

			if (!response) {
				throw new Error();
			}

			if (onSuccess && isSuccessResponse(response)) {
				onSuccess(response);
			} else {
				if (isCommonResponse(response)) {
					if (onError) {
						onError(response);
					}
				} else {
					new Error('Unexpected response format');
				}
			}

			return response;
		} catch (error) {
			if (onError) {
				onError(error as Error);
			}

			throw error;
		}
	};
}
