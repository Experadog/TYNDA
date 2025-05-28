import { useViewModel } from '@/i18n/getTranslate';
import { URL_ENTITIES } from '@/lib';
import {
	type StaffDeletionRequestModel,
	type StaffDeletionResponseModel,
	deleteStaff,
} from '@/services';
import type { Staff } from '@business-entities';
import { createAction, revalidateByTags, useAsyncAction } from '@common';
import { useState } from 'react';

type Props = {
	refetch: () => Promise<void>;
};

export function useStaffDeletionUseCase({ refetch }: Props) {
	const [isConfirmModal, setIsConfirmModal] = useState(false);
	const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

	const viewModel = useViewModel(['Toast']);

	const { execute } = useAsyncAction<StaffDeletionResponseModel, [StaffDeletionRequestModel]>({
		messages: viewModel.StaffDeletion,
	});

	const action = createAction({
		requestAction: deleteStaff,
		onSuccess: async () => {
			await revalidateByTags([URL_ENTITIES.STAFF]);
			await refetch();
			onClose();
		},
	});

	const onConfirm = async () => {
		if (!selectedStaff || !selectedStaff.id) return;
		await execute(action, { id: selectedStaff?.id });
	};

	const onOpen = (item: Staff) => {
		setSelectedStaff(item);
		setIsConfirmModal(true);
	};

	const onClose = () => {
		setIsConfirmModal(false);
	};

	const confirmModal = {
		open: onOpen,
		close: onClose,
		isOpen: isConfirmModal,
		onConfirm,
		selectedStaff,
	};

	return { confirmModal };
}
