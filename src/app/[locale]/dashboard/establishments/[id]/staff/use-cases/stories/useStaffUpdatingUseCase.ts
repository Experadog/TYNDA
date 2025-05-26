import { useViewModel } from '@/i18n/getTranslate';
import { URL_ENTITIES } from '@/lib';
import {
	type StaffUpdatingRequestModel,
	type StaffUpdatingResponseModel,
	updateStaff,
} from '@/services';
import {
	type StaffFormValues,
	createAction,
	loadFilesAction,
	revalidateByTags,
	useAsyncAction,
} from '@common';

type Props = {
	onCloseModal: () => void;
	refetch: () => Promise<void>;
};

export function useStaffUpdatingUseCase({ onCloseModal, refetch }: Props) {
	const viewModel = useViewModel(['Toast']);
	const { execute } = useAsyncAction<StaffUpdatingResponseModel, [StaffUpdatingRequestModel]>({
		messages: viewModel.EstablishmentUpdating,
	});

	const action = createAction({
		requestAction: updateStaff,
		onSuccess: async () => {
			await revalidateByTags([URL_ENTITIES.STAFF]);
			await refetch();
			onCloseModal();
		},
	});

	const onUpdate = async (values: StaffFormValues, id: string) => {
		const data: StaffUpdatingRequestModel = {
			id,
			payload: values,
		};

		if (values.avatar && values.avatar instanceof File) {
			const url = await loadFilesAction({
				data: [values.avatar],
				messages: viewModel.LoadFile,
			});

			if (url.length) {
				data.payload.avatar = url[0];
			}
		}

		await execute(action, data);
	};

	return { onUpdate };
}
