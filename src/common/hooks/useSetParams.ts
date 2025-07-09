'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import type { Params } from '../types/http.types';

function parseValue<T = unknown>(value: string): T {
	if (value === 'true') return true as T;
	if (value === 'false') return false as T;
	const num = Number(value);
	if (!Number.isNaN(num) && value.trim() !== '') return num as T;
	return value as T;
}

export function useSetParams() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const setParam = useCallback(
		<K extends keyof Params>(key: K, value: Params[K] | null) => {
			if (!value) {
				removeParam(key);
				return;
			}

			const params = new URLSearchParams(searchParams.toString());
			params.set(key, String(value));
			router.replace(`?${params.toString()}`, { scroll: false });
		},
		[router, searchParams],
	);

	const removeParam = useCallback(
		(key: keyof Params) => {
			const params = new URLSearchParams(searchParams.toString());
			params.delete(key);
			router.replace(`?${params.toString()}`, { scroll: false });
		},
		[router, searchParams],
	);

	const removeParams = useCallback(
		(keys: (keyof Params)[]) => {
			const params = new URLSearchParams(searchParams.toString());
			for (const key of keys) {
				params.delete(key);
			}
			router.replace(`?${params.toString()}`, { scroll: false });
		},
		[router, searchParams],
	);

	const setParams = useCallback(
		(newParams: Params) => {
			const params = new URLSearchParams(searchParams.toString());

			for (const [key, value] of Object.entries(newParams)) {
				if (value === undefined || value === null || value === '') {
					params.delete(key);
				} else {
					params.set(key, String(value));
				}
			}

			router.replace(`?${params.toString()}`, { scroll: false });
		},
		[router, searchParams],
	);

	const getParam = useCallback(
		<K extends keyof Params>(key: K): Params[K] | null => {
			const value = searchParams.get(key);
			return value !== null ? parseValue<Params[K]>(value) : null;
		},
		[searchParams],
	);

	const getParams = useCallback(
		<K extends keyof Params>(keys: K[]) => {
			const result: Partial<Pick<Params, K>> = {};

			for (const key of keys) {
				const value = searchParams.get(key);
				if (value !== null) {
					result[key] = parseValue<Params[K]>(value);
				}
			}

			return result;
		},
		[searchParams],
	);

	return {
		setParam,
		removeParam,
		setParams,
		getParam,
		getParams,
		removeParams,
	};
}
