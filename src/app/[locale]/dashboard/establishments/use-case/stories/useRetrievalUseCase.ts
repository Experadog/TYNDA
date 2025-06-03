import { type GetEstablishmentAllClientResponseModel, getEstablishmentAll } from '@/services';
import type { EstablishmentListItem } from '@business-entities';
import { usePagination } from '@common';

export function useRetrievalUseCase(data: GetEstablishmentAllClientResponseModel['data']) {
	const {
		states: { list, isLoading },
		actions: { onGoNextPage },
	} = usePagination<EstablishmentListItem>({
		initialData: data,
		entity: 'establishment',
		fetchFn: getEstablishmentAll,
	});

	return {
		actions: { onLoadMore: onGoNextPage },
		states: { items: list, totalItems: data.total, isLoading },
	};
}
