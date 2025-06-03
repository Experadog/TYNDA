import { type UsersRetrievalResponseModel, getUsers } from '@/services';
import { type UserListItem, UserRole } from '@business-entities';
import { usePagination } from '@common';

type Props = {
	data: UsersRetrievalResponseModel['data'];
};

export function useUsersPaginationUseCase({ data }: Props) {
	const table_params = usePagination<UserListItem>({
		initialData: data,
		entity: 'user',
		fetchFn: getUsers,
	});
	const selection_params = usePagination<UserListItem>({
		entity: 'user',
		fetchFn: getUsers,
		params: { role: UserRole.ESTABLISHER },
	});

	return { table_params, selection_params };
}
