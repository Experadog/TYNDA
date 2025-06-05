import { type GetEstablishmentAllClientResponseModel, getEstablishmentAll } from '@/services';
import type { EstablishmentListItem } from '@business-entities';
import { usePagination } from '@common';

export function useRetrievalUseCase(data: GetEstablishmentAllClientResponseModel['data']) {
	const pagination = usePagination<EstablishmentListItem>({
		initialData: data,
		entity: 'establishment',
		fetchFn: getEstablishmentAll,
	});

	return pagination;
}
