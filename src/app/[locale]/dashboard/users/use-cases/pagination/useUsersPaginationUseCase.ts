import { type UsersRetrievalResponseModel, getUsers } from '@/services';
import { type UserListItem, UserRole } from '@business-entities';
import { usePagination } from '@common';

type Props = {
	tableData: UsersRetrievalResponseModel['data'];
	selectionData: UsersRetrievalResponseModel['data'];
};

export function useUsersPaginationUseCase({ tableData, selectionData }: Props) {
	const table_params = usePagination<UserListItem>({
		initialData: tableData,
		entity: 'user',
		fetchFn: getUsers,
	});

	const selection_params = usePagination<UserListItem>({
		entity: 'user',
		fetchFn: getUsers,
		params: { role: UserRole.ESTABLISHER },
		initialData: selectionData,
	});

	return { table_params, selection_params };
}
