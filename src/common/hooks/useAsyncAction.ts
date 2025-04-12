'use client';

import { useState } from 'react';
import { pushToast } from '../toast/push-toast';
import { ActionMessages } from '../types/messages.types';
import { CommonResponse } from '../types/responses.types';

type AsyncAction<T, P extends any[]> = (...args: P) => Promise<T>;

interface UseAsyncActionProps {
    messages?: ActionMessages;
    throttleTime?: number;
}

export const useAsyncAction = <T, P extends any[]>(props: UseAsyncActionProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [lastExecuted, setLastExecuted] = useState<number | null>(null);

    const { messages, throttleTime = 3000 } = props;

    const execute = async (action: AsyncAction<T, P>, ...args: P): Promise<T> => {
        const now = Date.now();

        if (lastExecuted && now - lastExecuted < throttleTime) {
            return {} as T;
        }

        setLastExecuted(now);
        setIsLoading(true);
        setError(null);

        try {
            if (messages) {
                return await pushToast(action(...args) as Promise<CommonResponse<T>>, messages);
            } else {
                return await action(...args);
            }
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { execute, isLoading, error };
};
