'use client';

import { useState } from 'react';
import { pushToast } from '../toast/push-toast';
import type { ActionMessages } from '../types/messages.types';
import type { CommonResponse } from '../types/responses.types';

type AsyncAction<TResponse, TParams extends unknown[] = []> = (
	...args: TParams
) => Promise<TResponse>;

interface UseAsyncActionProps {
	messages?: ActionMessages;
	throttleTime?: number;
}

export function useAsyncAction<TResponse, TParams extends unknown[] = []>(
	props: UseAsyncActionProps,
) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [lastExecuted, setLastExecuted] = useState<number | null>(null);

	const { messages, throttleTime = 3000 } = props;

	const execute = async (
		action: AsyncAction<TResponse, TParams>,
		...args: TParams
	): Promise<TResponse> => {
		const now = Date.now();

		if (lastExecuted && now - lastExecuted < throttleTime) {
			return {} as TResponse;
		}

		setLastExecuted(now);
		setIsLoading(true);
		setError(null);

		try {
			const result = action(...args);

			if (messages) {
				return await pushToast(result as Promise<CommonResponse<TResponse>>, messages);
			}

			return await result;
		} catch (err) {
			setError(err as Error);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	return { execute, isLoading, error };
}
