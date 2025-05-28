import { isCommonResponse, isSuccessResponse } from '@/lib';

export interface ActionFactoryOptions<TArgs extends unknown[], TResponse> {
	requestAction: (...args: TArgs) => Promise<TResponse>;
	onSuccess?: (response: TResponse) => void | Promise<void>;
	onError?: (error: unknown) => void | Promise<void>;
}

export function createAction<TArgs extends unknown[], TResponse>({
	requestAction,
	onSuccess,
	onError,
}: ActionFactoryOptions<TArgs, TResponse>): (...args: TArgs) => Promise<TResponse> {
	return async (...args: TArgs): Promise<TResponse> => {
		try {
			const response = await requestAction(...args);

			if (!response) {
				throw new Error('Empty response');
			}

			if (onSuccess && isSuccessResponse(response)) {
				await onSuccess(response);
			} else if (isCommonResponse(response)) {
				if (onError) {
					await onError(response);
				}
			} else {
				throw new Error('Unexpected response format');
			}

			return response;
		} catch (error) {
			if (onError) {
				await onError(error);
			}
			throw error;
		}
	};
}
