import { useUser } from '@/providers/user/user-provider';
import {
	type EstablishmentClientRetrievalResponseModel,
	getEstablishmentAllAdmin,
	getEstablishmentAllEstablisher,
} from '@/services';
import type { EstablishmentListItem } from '@business-entities';
import { usePagination } from '@common';

export function useRetrievalUseCase(data: EstablishmentClientRetrievalResponseModel['data']) {
	const { user } = useUser();

	const isSuperAdmin = user?.is_superuser;

	const fetchFn = isSuperAdmin ? getEstablishmentAllAdmin : getEstablishmentAllEstablisher;

	const pagination = usePagination<EstablishmentListItem>({
		initialData: data,
		entity: 'establishment',
		fetchFn,
	});

	return pagination;
}
