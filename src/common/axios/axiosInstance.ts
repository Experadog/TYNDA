import { API_URL, COOKIES, getTokensFromSession } from '@/lib';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Params } from '../types/http.types';

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(async (config) => {
    const { cookies } = await import('next/headers');

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(COOKIES.SESSION);
    const tokens = getTokensFromSession(sessionCookie?.value);

    if (tokens) {
        config.headers['Cookie'] = tokens;
    }

    return config;
});

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

        console.log(
            'LOGGER:',
            method.toLocaleUpperCase(),
            url,
            response.status,
            response.data,
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
        }
        return {
            code: axios.isAxiosError(error) ? error.response?.status : 500,
            data: null,
        } as T;
    }
}

interface RequestOptions {
    url: string;
    params?: Params;
    data?: any;
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
