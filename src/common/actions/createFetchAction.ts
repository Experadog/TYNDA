'use server';

import { API_URL, COOKIES, getTokensFromSession, LOGGER, URL_ENTITIES } from '@/lib';
import { cookies } from 'next/headers';
import { Params } from '../types/http.types';


type Props = {
    endpoint: URL_ENTITIES;
    shouldBeAuthorized: boolean;
    params?: Params;
    revalidate?: boolean;
    revalidateTags?: URL_ENTITIES[];
};

export async function createFetchAction<T>({
    endpoint,
    shouldBeAuthorized,
    params,
    revalidate = false,
    revalidateTags,
}: Props): Promise<T> {
    const cleanBaseUrl = API_URL?.replace(/\/$/, '');
    const cleanEndpoint = endpoint.replace(/^\//, '');

    const url = new URL(`${cleanBaseUrl}/${cleanEndpoint}`);

    const headers: HeadersInit = {};

    if (params) {
        Object.keys(params).forEach((key) => {
            const paramValue = params[key as keyof Params];
            if (paramValue !== undefined) {
                url.searchParams.append(key, paramValue);
            }
        });
    }

    if (shouldBeAuthorized) {
        const cookieStore = await cookies();
        const session = cookieStore.get(COOKIES.SESSION)?.value;
        const credentials = getTokensFromSession(session);
        if (session) {
            headers['Cookie'] = credentials;
        }
    }

    try {
        const response = await fetch(url.toString(), {
            method: 'GET',
            credentials: 'include',
            cache: revalidate ? 'no-store' : 'force-cache',
            headers,
            next: { tags: revalidateTags },
        });

        if (!response.ok) {
            return {} as T;
        }

        const data: T = await response.json();

        return data;
    } catch (error) {
        LOGGER.error(error);

        return {} as T;
    }
}
