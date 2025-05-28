'use client';

import { PAGINATION, isSuccessResponse } from '@/lib';
import { useEffect, useState } from 'react';
import type { Params } from '../types/http.types';
import type { CommonResponse, Paginated } from '../types/responses.types';

type FetchFunction<T> = (params: Params) => Promise<CommonResponse<Paginated<T>>>;

export function usePagination<T>(
	initialData: Paginated<T>,
	fetchFn: FetchFunction<T>,
	entity: keyof typeof PAGINATION,
) {
	const [pages, setPages] = useState<Record<number, T[]>>({
		[initialData.page]: initialData.items,
	});

	const [page, setPage] = useState(Number(initialData.page));
	const [isLoading, setIsLoading] = useState(false);

	const fetchPage = async (pageToFetch: number): Promise<boolean> => {
		setIsLoading(true);
		const response = await fetchFn({
			page: String(pageToFetch),
			size: PAGINATION[entity].size,
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
		setPages((prev) => ({
			...prev,
			[initialData.page]: initialData.items,
		}));
	}, [initialData.page, initialData.items]);

	const states = {
		currentPage: page,
		data: pages[page] || [],
		isLoading,
		isFirstPage: page === 1,
		hasNextPage: initialData.total_pages !== 0 && page !== initialData.total_pages,
		allPages: pages,
	};

	const actions = {
		onGoNextPage,
		setPage,
		refetchCurrentPage,
	};

	return { states, actions };
}
