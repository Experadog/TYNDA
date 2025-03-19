// lib/fetchAction.ts

import { LOCAL_API_URL } from '@/lib';

export async function createFetchAction<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(endpoint, LOCAL_API_URL);

    if (params) {
        Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
    }

    try {
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: T = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}
