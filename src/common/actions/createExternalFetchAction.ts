'use server';

import { EXTERNAL_APIS, LOGGER } from '@/lib';
import type { Params } from '../types/http.types';

type Props = {
	endpoint: string;
	params?: Params;
	postfix?: (string | number)[];
	revalidate?: boolean;
	revalidateTags?: string[];
	baseURLKey: keyof typeof EXTERNAL_APIS;
};

export async function createExternalFetchAction<T>({
	endpoint,
	params,
	postfix = [],
	revalidate = false,
	revalidateTags,
	baseURLKey,
}: Props): Promise<T> {
	const cleanBaseUrl = EXTERNAL_APIS[baseURLKey]?.replace(/\/$/, '');
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

	try {
		const response = await fetch(url.toString(), {
			method: 'GET',
			credentials: 'include',
			cache: revalidate ? 'no-store' : 'force-cache',
			headers,
			next: { tags: revalidateTags },
		});

		if (!response.ok) {
			LOGGER.error(`Fetch failed: ${response.statusText}`);
			return {} as T;
		}

		const data: T = await response.json();
		// LOGGER.success(`Received data from ${JSON.stringify(data, null, 2)}`);
		LOGGER.success(`Received data from: ${cleanEndpoint} `);

		return data;
	} catch (error) {
		LOGGER.error(error);
		return {} as T;
	}
}
