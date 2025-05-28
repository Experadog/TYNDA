import { useViewModel } from '@/i18n/getTranslate';
import { URL_ENTITIES } from '@/lib';
import {
	type StaffCreationRequestModel,
	type StaffCreationResponseModel,
	createStaff,
} from '@/services';
import { type StaffFormValues, createAction, revalidateByTags, useAsyncAction } from '@common';

type Props = {
	onCloseModal: () => void;
	refetch: () => Promise<void>;
};

export function useStaffCreationUseCase({ onCloseModal, refetch }: Props) {
	const viewModel = useViewModel(['Toast']);

	const { execute } = useAsyncAction<StaffCreationResponseModel, [StaffCreationRequestModel]>({
		messages: viewModel.StaffCreation,
	});

	const action = createAction({
		requestAction: createStaff,
		onSuccess: async () => {
			await revalidateByTags([URL_ENTITIES.STAFF]);
			await refetch();
			onCloseModal();
		},
	});

	const onCreate = async (values: StaffFormValues, establishment_id: string, roles: string[]) => {
		const data: StaffCreationRequestModel = {
			...values,
			permission_groups: roles,
			staff_establishment_id: establishment_id,
		};

		await execute(action, data);
	};

	return { onCreate };
}
