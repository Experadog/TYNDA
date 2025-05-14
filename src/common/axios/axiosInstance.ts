import { API_URL, COOKIES, LOGGER, PAGES, getTokensFromSession } from '@/lib';
import axios, { type AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';
import { permanentRedirect } from 'next/navigation';
import { clearCookie } from '../actions/clear-cookie';
import type { Params } from '../types/http.types';
import type { CommonResponse } from '../types/responses.types';

export const axiosInstance: AxiosInstance = axios.create({
	baseURL: API_URL,
	withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
	const { cookies } = await import('next/headers');

	const cookieStore = await cookies();
	const sessionCookie = cookieStore.get(COOKIES.SESSION);
	const tokens = getTokensFromSession(sessionCookie?.value);

	if (config.data) {
		LOGGER.info(config.data);
	}

	if (tokens) {
		LOGGER.warning('Adding cookie to request...');
		config.headers.set('Cookie', tokens);
	}

	return config;
});

axiosInstance.interceptors.response.use(
	(response) => {
		LOGGER.success(`Received data from: ${response.config.url}`);

		return response;
	},
	async (error: AxiosError) => {
		const { response } = error;
		const data = response?.data as CommonResponse<null>;

		LOGGER.error(`Error in ${response?.config.url}, errors: message: '${data.msg}'`);

		if (response?.status === 401 || data?.code === 401) {
			await clearCookie(COOKIES.SESSION);
			permanentRedirect(PAGES.HOME);
		}

		throw error;
	},
);

async function request<T>(
	method: 'get' | 'post' | 'put' | 'patch' | 'delete',
	{ url, params, data, headers }: RequestOptions,
): Promise<T> {
	try {
		const response: AxiosResponse<T> = await axiosInstance.request<T>({
			method,
			url,
			params,
			data,
			headers: {
				...headers,
			},
		});

		return response?.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return {
				code: error.response?.data.code || 500,
				data: error.response?.data,
			} as T;
		}

		return {
			code: 500,
			data: null,
		} as T;
	}
}

interface RequestOptions {
	url: string;
	params?: Params;
	data?: unknown;
	headers?: Record<string, string>;
}

export async function AXIOS_GET<T>(options: RequestOptions): Promise<T> {
	return request<T>('get', options);
}

export async function AXIOS_POST<T>(options: RequestOptions): Promise<T> {
	return request<T>('post', options);
}

export async function AXIOS_PUT<T>(options: RequestOptions): Promise<T> {
	return request<T>('put', options);
}

export async function AXIOS_PATCH<T>(options: RequestOptions): Promise<T> {
	return request<T>('patch', options);
}

export async function AXIOS_DELETE<T>(options: RequestOptions): Promise<T> {
	return request<T>('delete', options);
}
