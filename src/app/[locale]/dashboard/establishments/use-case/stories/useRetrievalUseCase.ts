import { type GetEstablishmentAllClientResponseModel, getEstablishmentAll } from '@/services';
import type { EstablishmentListItem } from '@business-entities';
import { usePagination } from '@common';
import { useMemo } from 'react';

export function useRetrievalUseCase(data: GetEstablishmentAllClientResponseModel['data']) {
	const {
		states: { allPages, isLoading },
		actions: { onGoNextPage },
	} = usePagination<EstablishmentListItem>({
		initialData: data,
		entity: 'establishment',
		fetchFn: getEstablishmentAll,
	});
	const items = useMemo(() => {
		return Object.values(allPages).flat();
	}, [allPages]);

	return {
		actions: { onLoadMore: onGoNextPage },
		states: { items, totalItems: data.total, isLoading },
	};
}
