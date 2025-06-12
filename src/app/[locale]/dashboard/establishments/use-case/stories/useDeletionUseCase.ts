import { URL_ENTITIES } from '@/lib';
import {
	type EstablishmentDeletionRequestModel,
	type EstablishmentDeletionResponseModel,
	deleteEstablishment,
} from '@/services';
import { createAction, revalidateByTags, useAsyncAction } from '@common';
import { useState } from 'react';

type Props = {
	viewModel: ViewModel['Toast']['EstablishmentDeletion'];
};

export function useDeletionUseCase({ viewModel }: Props) {
	const [isConfirm, setIsConfirm] = useState(false);
	const [deletionID, setDeletionID] = useState('');

	const { execute: establishmentDeletionExecute } = useAsyncAction<
		EstablishmentDeletionResponseModel,
		[EstablishmentDeletionRequestModel]
	>({ messages: viewModel });

	const establishmentDeletionAction = createAction({
		requestAction: deleteEstablishment,
		onSuccess: () => {
			revalidateByTags([
				URL_ENTITIES.ESTABLISHMENT_ALL_ESTABLISHER,
				URL_ENTITIES.ESTABLISHMENT_ALL_CLIENT,
			]);
			setDeletionID('');
			setIsConfirm(false);
		},
	});

	const onDelete = async () => {
		await establishmentDeletionExecute(establishmentDeletionAction, { id: deletionID });
	};

	const onOpenConfirm = (id: string) => {
		setDeletionID(id);
		setIsConfirm(true);
	};

	const onCloseConfirm = () => {
		setIsConfirm(false);
		setDeletionID('');
	};

	return { onDelete, onOpenConfirm, isConfirm, onCloseConfirm };
}
