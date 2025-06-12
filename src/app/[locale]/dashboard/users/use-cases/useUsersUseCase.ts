import type { UsersRetrievalResponseModel } from '@/services';
import { useUsersModalUseCase } from './modal/useUsersModalUseCase';
import { useUsersPaginationUseCase } from './pagination/useUsersPaginationUseCase';
import { useUserSchemaUseCase } from './schema/useUserSchemaUseCase';
import { useUsersCreationUseCase } from './stories/useUsersCreationUseCase';
import { useUsersTableUseCase } from './table/useTableUseCase';

type Props = {
	data: UsersRetrievalResponseModel['data'];
};

export function useUserUseCase({ data }: Props) {
	const schema = useUserSchemaUseCase();
	const pagination = useUsersPaginationUseCase({ data });
	const modal = useUsersModalUseCase();
	const creation = useUsersCreationUseCase({
		onCloseModal: modal.actions.onClose,
		refetch: pagination.table_params.actions.refetchCurrentPage,
	});

	const table = useUsersTableUseCase({ onOpenCreation: modal.actions.onOpen });

	return { pagination, modal, schema, creation, table };
}
export type UseUsersUseCaseType = ReturnType<typeof useUserUseCase>;
