'use server';

import { DTOEmptyCommonPagination, DTOEmptyCommonResponse } from '@/dto/dtoEmpty';
import { API_URL, LOGGER, isEmptyObject } from '@/lib';
import { getSession } from '../session-manager/session-manager';
import type { Params } from '../types/http.types';

type Props = {
	endpoint: string;
	shouldBeAuthorized: boolean;
	params?: Params;
	postfix?: (string | number)[];
	revalidate?: boolean;
	revalidateTags?: string[];
};

const onError = <T>(params?: Params): T => {
	'use client';
	if (params?.page || params?.size) {
		return DTOEmptyCommonPagination() as T;
	}

	return DTOEmptyCommonResponse() as T;
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

	if (params && !isEmptyObject(params)) {
		LOGGER.info(params);
		for (const [key, value] of Object.entries(params)) {
			if (value !== undefined) {
				url.searchParams.append(key, String(value));
			}
		}
	}

	const headers = new Headers();

	if (shouldBeAuthorized) {
		const session = await getSession();

		if (!session) {
			return onError(params);
		}

		const tokens = `access_token=${session.access_token}; refresh_token=${session.refresh_token}`;
		headers.set('Cookie', tokens);
	}

	try {
		const response = await fetch(url.toString(), {
			method: 'GET',
			credentials: 'include',
			cache: revalidate ? 'default' : 'force-cache',
			headers,
			next: { tags: revalidateTags },
		});

		const data: T = await response.json();

		if (!response.ok) {
			LOGGER.error(
				`Fetch failed: ${response.statusText}(${response.status}) ${pathWithPostfix}`,
			);
			return onError(params);
		}

		LOGGER.success(`Received data from: ${pathWithPostfix} `);

		return data;
	} catch (error) {
		LOGGER.error(error);
		return onError(params);
	}
}
