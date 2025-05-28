import { type UsersRetrievalResponseModel, getUsers } from '@/services';
import type { UserListItem } from '@business-entities';
import { usePagination } from '@common';

type Props = {
	data: UsersRetrievalResponseModel['data'];
};

export function useUsersPaginationUseCase({ data }: Props) {
	const params = usePagination<UserListItem>(data, getUsers, 'user');

	return params;
}
