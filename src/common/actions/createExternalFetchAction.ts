import { EXTERNAL_APIS, LOGGER } from '@/lib';
import type { Method } from 'axios';
import type { Params } from '../types/http.types';
import { sendErrorToTelegram } from './sendUserErrorToTelegram';

type Props = {
	endpoint: string;
	params?: Params & Record<string, unknown>;
	postfix?: (string | number)[];
	baseURLKey: keyof typeof EXTERNAL_APIS;
	additionalHeaders?: HeadersInit;
	method?: Method;
	body?: BodyInit;
};

export async function createExternalFetchAction<T>({
	endpoint,
	params,
	postfix = [],
	baseURLKey,
	additionalHeaders,
	method = 'GET',
	body,
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

	const headers: HeadersInit = { ...additionalHeaders };

	try {
		const response = await fetch(url.toString(), {
			method,
			headers,
			body,
			cache: 'no-store',
		});

		if (!response.ok) {
			await sendErrorToTelegram({
				message: `Error in ${pathWithPostfix}, message:${response.statusText}`,
				payload: JSON.stringify(params || {}),
			});
			LOGGER.error(`Fetch failed: ${response.statusText}`);
			return {} as T;
		}

		const data: T = await response.json();
		LOGGER.success(`Received data from: ${cleanEndpoint}`);
		return data;
	} catch (error) {
		await sendErrorToTelegram({
			message: `Error in ${pathWithPostfix}, message:${error} - GET`,
			payload: JSON.stringify(params || {}),
		});
		LOGGER.error(error);
		return {} as T;
	}
}
