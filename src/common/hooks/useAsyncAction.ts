'use client';

import { useRef, useState } from 'react';

type AsyncAction<T, P extends any[] = any[]> = (...args: P) => Promise<T>;

export function useAsyncAction<T, P extends any[] = any[]>(throttleTime: number = 3000) {
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
            const result = await action(...args);
            return result;
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
