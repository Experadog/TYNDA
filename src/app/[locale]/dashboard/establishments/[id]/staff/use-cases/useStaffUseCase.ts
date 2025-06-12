import type { StaffRetrievalResponseModel } from '@/services';
import { useStaffPaginationUseCase } from './pagination/useStaffPaginationUseCase';
import { useStaffFormUseCase } from './schema/useStaffFormUseCase';
import { useStaffCreationUseCase } from './stories/useStaffCreationUseCase';
import { useStaffDeletionUseCase } from './stories/useStaffDeletionUseCase';
import { useStaffUpdatingUseCase } from './stories/useStaffUpdatingUseCase';
import { useStaffTableUseCase } from './table/useStaffTableUseCase';

type Props = {
	staff: StaffRetrievalResponseModel['data'];
};

export function useStaffUseCase({ staff }: Props) {
	const pagination = useStaffPaginationUseCase(staff);

	const { schema, modal } = useStaffFormUseCase();

	const create = useStaffCreationUseCase({
		onCloseModal: modal.actions.onClose,
		refetch: pagination.actions.refetchCurrentPage,
	});

	const update = useStaffUpdatingUseCase({
		onCloseModal: modal.actions.onClose,
		refetch: pagination.actions.refetchCurrentPage,
	});

	const deletion = useStaffDeletionUseCase({ refetch: pagination.actions.refetchCurrentPage });

	const table = useStaffTableUseCase({
		onOpenModal: modal.actions.onOpen,
		onDelete: deletion.confirmModal.open,
	});

	return {
		modal,
		schema,
		create,
		pagination,
		update,
		deletion,
		table,
	};
}

export type UseStaffUseCaseTypes = ReturnType<typeof useStaffUseCase>;
