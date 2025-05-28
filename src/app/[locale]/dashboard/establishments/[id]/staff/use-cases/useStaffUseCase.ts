import type { StaffRetrievalResponseModel } from '@/services';
import { useStaffModalUseCase } from './modal/useStaffModalUseCase';
import { useStaffPaginationUseCase } from './pagination/useStaffPaginationUseCase';
import { useStaffFromUseCase } from './schema/useStaffFormUseCase';
import { useStaffCreationUseCase } from './stories/useStaffCreationUseCase';
import { useStaffDeletionUseCase } from './stories/useStaffDeletionUseCase';
import { useStaffUpdatingUseCase } from './stories/useStaffUpdatingUseCase';

type Props = {
	staff: StaffRetrievalResponseModel['data'];
};

export function useStaffUseCase({ staff }: Props) {
	const schema = useStaffFromUseCase();
	const pagination = useStaffPaginationUseCase(staff);

	const modal = useStaffModalUseCase({ schema });

	const create = useStaffCreationUseCase({
		onCloseModal: modal.actions.onClose,
		refetch: pagination.actions.refetchCurrentPage,
	});

	const update = useStaffUpdatingUseCase({
		onCloseModal: modal.actions.onClose,
		refetch: pagination.actions.refetchCurrentPage,
	});
	const deletion = useStaffDeletionUseCase({ refetch: pagination.actions.refetchCurrentPage });

	return {
		modal,
		schema,
		create,
		pagination,
		update,
		deletion,
	};
}

export type UseStaffUseCaseTypes = ReturnType<typeof useStaffUseCase>;
