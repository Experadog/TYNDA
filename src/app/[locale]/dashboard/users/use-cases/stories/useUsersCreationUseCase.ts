import { useViewModel } from '@/i18n/getTranslate';
import { URL_ENTITIES } from '@/lib';
import {
	type UserCreationRequestModel,
	type UserCreationResponseModel,
	createUser,
} from '@/services';
import { type UserFormValues, createAction, revalidateByTags, useAsyncAction } from '@common';

type Props = {
	onCloseModal: () => void;
	refetch: () => Promise<void>;
};

export function useUsersCreationUseCase({ onCloseModal, refetch }: Props) {
	const viewModel = useViewModel(['Toast']);

	const { execute } = useAsyncAction<UserCreationResponseModel, [UserCreationRequestModel]>({
		messages: viewModel.UserCreation,
	});

	const action = createAction({
		requestAction: createUser,
		onSuccess: async () => {
			await revalidateByTags([URL_ENTITIES.USERS]);
			await refetch();
			onCloseModal();
		},
	});

	const onCreate = async (
		values: UserFormValues,
		establishment_id?: string,
		roles?: string[],
	) => {
		const data: UserCreationRequestModel = {
			...values,
			permission_groups: roles,
			staff_establishment_id: establishment_id,
		};

		await execute(action, data);
	};

	return { onCreate };
}
