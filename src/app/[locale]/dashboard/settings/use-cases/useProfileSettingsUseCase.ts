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
import { useEffect, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

export function useProfileSettingsUseCase() {
	const { user } = useUser();

	const defaultValues = useMemo(
		() => ({
			first_name: user?.first_name || '',
			last_name: user?.last_name || '',
			phone: user?.phone ?? undefined,
			avatar: user?.avatar || undefined,
		}),
		[user],
	);

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
		let avatar: string | File | null | undefined = values.avatar;

		if (avatar && avatar instanceof File) {
			const uploadedFiles = await loadFilesAction({
				data: [avatar],
				toastMessage: viewModel.Toast.LoadFile,
				validationMessage: viewModel.CommonToast.too_large_image,
			});

			avatar = uploadedFiles[0];
		}

		const payload: ProfileFormValues = { ...values, avatar };

		await execute(updateProfileAction, payload);
	};

	useEffect(() => {
		if (user) {
			schema.reset(defaultValues);
		}
	}, [user, schema]);

	const states = { schema, avatar: typeof avatar === 'string' ? avatar : '' };
	const actions = { onSubmit, onImageChange, onReset };

	return { states, actions };
}
