'use server';

import { DTOEmptyCommonPagination, DTOEmptyCommonResponse } from '@/dto/dtoEmpty';
import { API_URL, LOGGER, isEmptyObject } from '@/lib';
import { getSession } from '../session-manager/session-manager';
import type { Params } from '../types/http.types';
import { sendErrorToTelegram } from './sendUserErrorToTelegram';

type Props = {
	endpoint: string;
	shouldBeAuthorized: boolean;
	params?: Params;
	postfix?: (string | number)[];
	revalidate?: boolean;
	revalidateTags?: string[];
};

const returnEmptyDTO = <T>(params?: Params, text?: string) => {
	if (params?.page || params?.size) {
		return DTOEmptyCommonPagination(text) as T;
	}

	return DTOEmptyCommonResponse(text) as T;
};

const onError = async <T>(
	pathWithPostfix: string,
	params?: Params,
	text?: string,
	code?: number,
): Promise<T> => {
	await sendErrorToTelegram({
		message: `Error in ${pathWithPostfix}, message: '${text}(${code})`,
		payload: JSON.stringify(params || {}),
	});

	return returnEmptyDTO(params, text);
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

	try {
		if (shouldBeAuthorized) {
			const session = await getSession();

			if (!session) {
				return returnEmptyDTO(params, 'Session not found...');
			}

			headers.set(
				'Cookie',
				`access_token=${session.access_token}; refresh_token=${session.refresh_token}`,
			);
		}

		const response = await fetch(url.toString(), {
			method: 'GET',
			cache: revalidate ? 'default' : 'force-cache',
			headers,
			next: { tags: revalidateTags },
		});

		const data: T = await response.json();

		if (!response.ok) {
			LOGGER.error(
				`Fetch failed: ${response.statusText}(${response.status}) ${pathWithPostfix}`,
			);
			return onError(pathWithPostfix, params, response.statusText, response.status);
		}

		LOGGER.success(`Received data from: ${pathWithPostfix}`);
		return data;
	} catch (error) {
		LOGGER.error(error);
		return onError(pathWithPostfix, params, `Unexpected Error: ${JSON.stringify(error)}`, 555);
	}
}
