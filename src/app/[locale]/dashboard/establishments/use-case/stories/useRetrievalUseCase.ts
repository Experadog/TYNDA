import { isSuccessResponse } from '@/lib';
import { type GetEstablishmentAllClientResponseModel, getEstablishmentAll } from '@/services';
import type { EstablishmentListItem } from '@business-entities';
import { useEffect, useState } from 'react';

export function useRetrievalUseCase(data: GetEstablishmentAllClientResponseModel['data']) {
	const [items, setItems] = useState<EstablishmentListItem[]>(data?.items);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const onLoadMore = async () => {
		setIsLoading(true);
		const response = await getEstablishmentAll({
			page: String(page + 1),
			size: '2',
		});

		if (isSuccessResponse(response)) {
			setPage((prev) => prev + 1);
			setItems((prev) => [...prev, ...response.data.items]);
		}

		setIsLoading(false);
	};

	useEffect(() => {
		setItems(data.items);
	}, [data.items]);

	return { actions: { onLoadMore }, states: { items, totalItems: data.total, isLoading } };
}
