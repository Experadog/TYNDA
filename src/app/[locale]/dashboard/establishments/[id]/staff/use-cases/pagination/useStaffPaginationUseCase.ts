import { PAGINATION, isSuccessResponse } from '@/lib';
import { type StaffRetrievalResponseModel, getStaff } from '@/services';
import type { Staff } from '@business-entities';
import { useEffect, useState } from 'react';

export function useStaffPaginationUseCase(initialData: StaffRetrievalResponseModel['data']) {
	const [staffPages, setStaffPages] = useState<Record<number, Staff[]>>({
		[initialData.page]: initialData.items,
	});
	const [page, setPage] = useState(Number(initialData.page));
	const [isLoading, setIsLoading] = useState(false);

	const fetchPage = async (pageToFetch: number) => {
		setIsLoading(true);
		const response = await getStaff({ page: String(pageToFetch), size: PAGINATION.staff.size });

		if (isSuccessResponse(response)) {
			if (response.data.items.length) {
				setStaffPages((prev) => ({
					...prev,
					[pageToFetch]: response.data.items,
				}));
			} else {
				setStaffPages((prev) => {
					const updated = { ...prev };
					delete updated[pageToFetch];
					return updated;
				});

				if (page > 1) {
					setPage((prev) => prev - 1);
				}
			}
		}

		setIsLoading(false);
	};

	const onGoNextPage = async () => {
		const nextPage = page + 1;

		if (staffPages[nextPage]) {
			setPage(nextPage);
			return;
		}

		await fetchPage(nextPage);
		setPage(nextPage);
	};

	const refetchCurrentPage = async () => {
		await fetchPage(page);
	};

	useEffect(() => {
		setStaffPages((prev) => ({
			...prev,
			[initialData.page]: initialData.items,
		}));
	}, [initialData.page, initialData.items]);

	const states = {
		currentPage: page,
		staffList: staffPages[page] || [],
		isLoading,
		isFirstPage: page === 1,
		hasNextPage: initialData.total_pages !== 0 && page !== initialData.total_pages,
		allPages: staffPages,
	};

	const actions = {
		onGoNextPage,
		setPage,
		refetchCurrentPage,
	};

	return { states, actions };
}
