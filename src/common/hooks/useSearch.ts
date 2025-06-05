'use client';

import { PAGINATION, isSuccessResponse } from '@/lib';
import { useEffect, useState } from 'react';
import type { Params } from '../types/http.types';
import type { CommonResponse, Paginated } from '../types/responses.types';
import { useDebounce } from './useDebounce';

type SearchFunction<T> = (params: Params) => Promise<CommonResponse<Paginated<T>>>;

type Props<T> = {
	searchFn: SearchFunction<T>;
	entity: keyof typeof PAGINATION;
	delayMs?: number;
	initialData?: Paginated<T>;
};

export function useSearch<T>({ searchFn, entity, delayMs, initialData }: Props<T>) {
	const [searchValue, setSearchValue] = useState('');
	const [data, setData] = useState<Paginated<T> | undefined>(initialData);
	const [isLoading, setIsLoading] = useState(false);

	const debouncedSearchValue = useDebounce(searchValue, delayMs);

	const fetchFn = async () => {
		setIsLoading(true);

		const response = await searchFn({
			size: PAGINATION[entity].size,
			page: PAGINATION[entity].page,
			search_name: debouncedSearchValue || undefined,
		});

		if (isSuccessResponse(response)) {
			setData(response.data);
		}

		setIsLoading(false);
	};

	const refetch = async () => {
		setIsLoading(true);
		const response = await searchFn({
			size: PAGINATION[entity].size,
			page: PAGINATION[entity].page,
			search_name: debouncedSearchValue || undefined,
		});
		if (isSuccessResponse(response)) {
			setData(response.data);
		}
		setIsLoading(false);
	};

	const onChange = (value: string) => {
		setSearchValue(value);
	};

	useEffect(() => {
		if (debouncedSearchValue) {
			fetchFn();
		} else {
			setSearchValue('');
			setData(initialData || undefined);
		}
	}, [debouncedSearchValue]);

	return {
		data,
		isLoading,
		searchValue,
		onChange,
		refetch,
	};
}
