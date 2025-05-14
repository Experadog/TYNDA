'use server';

import { API_URL, COOKIES, LOGGER, getTokensFromSession } from '@/lib';
import { cookies } from 'next/headers';
import type { Params } from '../types/http.types';

type Props = {
	endpoint: string;
	shouldBeAuthorized: boolean;
	params?: Params;
	postfix?: (string | number)[];
	revalidate?: boolean;
	revalidateTags?: string[];
};

export async function createFetchAction<T>({
	endpoint,
	shouldBeAuthorized,
	params,
	postfix = [],
	revalidate = false,
	revalidateTags,
}: Props): Promise<T> {
	const cleanBaseUrl = API_URL?.replace(/\/$/, '');
	const cleanEndpoint = endpoint.replace(/^\//, '');

	const pathWithPostfix = [cleanEndpoint, ...postfix.map((p) => encodeURIComponent(p))].join('/');

	const url = new URL(`${cleanBaseUrl}/${pathWithPostfix}`);

	if (params) {
		for (const [key, value] of Object.entries(params)) {
			if (value !== undefined) {
				url.searchParams.append(key, String(value));
			}
		}
	}

	const headers: HeadersInit = {};

	if (shouldBeAuthorized) {
		const cookieStore = await cookies();
		const session = cookieStore.get(COOKIES.SESSION)?.value;
		const credentials = getTokensFromSession(session);
		if (session) {
			headers.Cookie = credentials;
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
			LOGGER.error(`Fetch failed: ${response.statusText} ${url}`);
			return {} as T;
		}

		const data: T = await response.json();
		LOGGER.success(`Received data from: ${cleanEndpoint} `);
		// LOGGER.success(`Received data: ${JSON.stringify(data, null, 2)}`);

		return data;
	} catch (error) {
		LOGGER.error(error);
		return {} as T;
	}
}
