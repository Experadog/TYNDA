import { useViewModel } from '@/i18n/getTranslate';
import { URL_ENTITIES } from '@/lib';
import { useUser } from '@/providers/user/user-provider';
import type { ProfileUpdateResponseModel } from '@/services';
import { updateProfile } from '@/services/profile/profileService';
import {
	type ProfileFormValues,
	createAction,
	createProfileSchema,
	loadFilesAction,
	revalidateByTags,
	useAsyncAction,
} from '@common';
import { useWatch } from 'react-hook-form';

export function useProfileSettingsUseCase() {
	const { user } = useUser();

	const defaultValues = {
		first_name: user?.first_name || '',
		last_name: user?.last_name || '',
		phone: user?.phone ?? undefined,
		avatar: user?.avatar || '',
	};

	const viewModel = useViewModel(['Validation', 'Toast', 'Shared', 'CommonToast']);

	const schema = createProfileSchema({
		message: viewModel.Validation,
		defaultValues,
	});

	const avatar =
		useWatch({
			control: schema.control,
			name: 'avatar',
		}) || null;

	const { execute } = useAsyncAction<ProfileUpdateResponseModel, [ProfileFormValues]>({
		messages: viewModel.Toast.UpdateProfile,
	});

	const updateProfileAction = createAction({
		requestAction: updateProfile,
		onSuccess: () => revalidateByTags([URL_ENTITIES.PROFILE]),
	});

	const onImageChange = (file: File | null) => {
		schema.setValue('avatar', file, { shouldDirty: true });
	};

	const onReset = () => {
		schema.reset();
	};

	const onSubmit = async (values: ProfileFormValues) => {
		if (values.avatar && values.avatar instanceof File) {
			const res = await loadFilesAction({
				data: [values.avatar],
				toastMessage: viewModel.Toast.LoadFile,
				validationMessage: viewModel.CommonToast.too_large_image,
			});

			await execute(updateProfileAction, { ...values, avatar: res[0] });

			schema.reset({
				...values,
				avatar: res[0],
			});
		}
	};

	const states = { schema, avatar: typeof avatar === 'string' ? avatar : '' };
	const actions = { onSubmit, onImageChange, onReset };

	return { states, actions };
}
