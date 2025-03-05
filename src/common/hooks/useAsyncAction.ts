'use client';

import { useRef, useState } from 'react';
import { pushToast } from '../toast/push-toast';
import { ActionMessages } from '../types/messages.types';
import { CommonResponse } from '../types/responses.types';

type AsyncAction<T, P extends any[] = any[]> = (...args: P) => Promise<T>;

interface UseAsyncActionProps {
    throttleTime?: number;
    messages: ActionMessages;
}

export function useAsyncAction<T extends CommonResponse<any>, P extends any[]>({ throttleTime = 3000, messages }: UseAsyncActionProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [lastExecuted, setLastExecuted] = useState<number | null>(null);
    const isThrottling = useRef(false);

    const execute = async (action: AsyncAction<T, P>, ...args: P) => {
        const now = Date.now();

        if (lastExecuted && now - lastExecuted < throttleTime) {
            return;
        }

        setLastExecuted(now);
        setIsLoading(true);
        setError(null);

        try {
            isThrottling.current = true;
            return await pushToast(action(...args), messages);
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setIsLoading(false);
            isThrottling.current = false;
        }
    };

    return { isLoading, error, execute };
}
