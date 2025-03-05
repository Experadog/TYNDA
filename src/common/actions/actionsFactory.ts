interface ActionFactoryOptions<TRequest, TResponse> {
    requestAction: (values: TRequest) => Promise<TResponse>;
    onSuccess?: (response: TResponse) => void;
    onError?: (error: Error) => void;
}

export function createActionFactory<TRequest, TResponse>({
    requestAction,
    onSuccess,
    onError,
}: ActionFactoryOptions<TRequest, TResponse>) {
    return async (values: TRequest): Promise<TResponse> => {
        try {
            const response = await requestAction(values);

            if (!response) {
                throw new Error('No response data');
            }

            if (onSuccess) {
                onSuccess(response);
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
