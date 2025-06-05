'use client';

import { PAGINATION, isSuccessResponse } from '@/lib';
import { useEffect, useMemo, useState } from 'react';
import type { Params } from '../types/http.types';
import type { CommonResponse, Paginated } from '../types/responses.types';

type FetchFunction<T> = (params: Params) => Promise<CommonResponse<Paginated<T>>>;

type UsePaginationParams<T> = {
	initialData?: Paginated<T>;
	fetchFn: FetchFunction<T>;
	entity: keyof typeof PAGINATION;
	params?: Params;
	keys?: Array<string | null | undefined | number | boolean>;
};

export function usePagination<T>({
	initialData,
	fetchFn,
	entity,
	params = {},
	keys = [],
}: UsePaginationParams<T>) {
	const [pages, setPages] = useState<Record<number, T[]>>(
		initialData ? { [initialData.page]: initialData.items } : {},
	);

	const [page, setPage] = useState(initialData ? Number(initialData.page) : 1);
	const [isLoading, setIsLoading] = useState(!initialData);

	const fetchPage = async (pageToFetch: number): Promise<boolean> => {
		setIsLoading(true);
		const response = await fetchFn({
			page: String(pageToFetch),
			size: PAGINATION[entity].size,
			...params,
		});

		let success = false;

		if (isSuccessResponse(response)) {
			const { items } = response.data;

			if (items.length) {
				setPages((prev) => ({
					...prev,
					[pageToFetch]: items,
				}));
				success = true;
			} else {
				setPages((prev) => {
					const updated = { ...prev };
					delete updated[pageToFetch];
					return updated;
				});

				if (pageToFetch === page && page > 1) {
					const prevPage = page - 1;

					if (pages[prevPage]) {
						setPage(prevPage);
					} else {
						await fetchPage(prevPage);
						setPage(prevPage);
					}
				}
			}
		}

		setIsLoading(false);
		return success;
	};

	const onGoNextPage = async () => {
		const nextPage = page + 1;

		if (pages[nextPage]) {
			setPage(nextPage);
			return;
		}

		const success = await fetchPage(nextPage);
		if (success) {
			setPage(nextPage);
		}
	};

	const refetchCurrentPage = async () => {
		await fetchPage(page);
	};

	useEffect(() => {
		if (!initialData) {
			fetchPage(page);
		}
	}, []);

	useEffect(() => {
		if (!initialData) return;

		setPages((prev) => {
			const existing = prev[initialData.page];

			const isSame =
				existing &&
				existing.length === initialData.items.length &&
				existing.every((item, idx) => item === initialData.items[idx]);

			if (isSame) return prev;

			return {
				...prev,
				[initialData.page]: initialData.items,
			};
		});
	}, [initialData?.page, initialData?.items]);

	useEffect(() => {
		setPages(initialData ? { [initialData.page]: initialData.items } : {});
		setPage(initialData ? Number(initialData.page) : 1);
		setIsLoading(!initialData);

		if (!initialData) {
			fetchPage(1);
		}
	}, [JSON.stringify(keys)]);

	const items = useMemo(() => {
		const flatItems = Object.values(pages).flat();
		const seen = new Set();
		return flatItems.filter((item: T) => {
			const key = JSON.stringify(item);
			if (seen.has(key)) return false;
			seen.add(key);
			return true;
		});
	}, [pages]);

	const states = {
		currentPage: page,
		data: pages[page] || [],
		isLoading,
		isFirstPage: page === 1,
		hasNextPage:
			!!initialData && initialData.total_pages !== 0 && page !== initialData.total_pages,
		allPages: pages,
		list: items,
		total: initialData?.total || 0,
	};

	const actions = {
		onGoNextPage,
		setPage,
		refetchCurrentPage,
	};

	return { states, actions };
}
