import { isSuccessResponse } from '@/lib';

interface ActionFactoryOptions<TRequest, TResponse> {
    requestAction: (values: TRequest) => Promise<TResponse>;
    onSuccess?: (response: TResponse) => void;
    onError?: (error?: Error) => void;
}

export function createAction<TRequest, TResponse>({ requestAction, onSuccess, onError }: ActionFactoryOptions<TRequest, TResponse>) {
    return async (values: TRequest): Promise<TResponse> => {
        try {
            const response = await requestAction(values);

            if (!response) {
                throw new Error('Request failed');
            }

            if (onSuccess && isSuccessResponse(response)) {
                onSuccess(response);
            } else {
                if (onError) {
                    onError();
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
