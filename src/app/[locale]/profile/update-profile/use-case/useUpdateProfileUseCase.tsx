'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { useRouter } from '@/i18n/routing';
import { PAGES, phoneFormatter } from '@/lib';
import {
	type CredentialsUpdateRequestModel,
	type CredentialsUpdateResponseModel,
	type ProfileUpdateResponseModel,
	logout,
} from '@/services';
import {
	firstStepPhoneVerification,
	updateCredentials,
	updateProfile,
} from '@/services/profile/profileService';
import type { User } from '@business-entities';
import {
	type CommonDataStringResponse,
	type CommonResponse,
	createAction,
	createCredentialsSchema,
	createProfileSchema,
	pushCommonToast,
	useAsyncAction,
} from '@common';
import { type ReactNode, createContext, useContext, useState } from 'react';

interface UpdateProfileContextType {
	states: {
		updateProfile: {
			form: ReturnType<typeof createProfileSchema>;
			isLoading: boolean;
		};

		credentials: {
			form: ReturnType<typeof createCredentialsSchema>;
		};

		phone: {
			preVerification: {
				isOpen: boolean;
				isExecuted: boolean;
				isLoading: boolean;
			};
		};
	};

	actions: {
		onUpdateProfile: (payload: Partial<User>) => Promise<void>;

		phone: {
			preVerification: {
				start: () => Promise<void>;
				open: () => void;
				close: () => void;
			};
		};
		onUpdateCredentials: (data: CredentialsUpdateRequestModel) => Promise<void>;
		onLogout: () => Promise<void>;
	};
}

const UpdateProfileContext = createContext<UpdateProfileContextType | undefined>(undefined);

export const UpdateProfileProvider: React.FC<{ children: ReactNode; user: User | null }> = ({
	children,
	user,
}) => {
	const viewModel = useViewModel(['Toast']);

	const router = useRouter();

	const [isPreVerificationOpen, setIsPreVerificationOpen] = useState(false);
	const [isPreVerificationExecuted, setIsPreVerificationExecuted] = useState(false);

	const updateProfileForm = createProfileSchema({
		message: {
			first_name: 'Введите корректное имя',
			last_name: 'Введите корректный номер',
			phone: 'Введите корректный номер',
		},
		defaultValues: {
			first_name: user?.first_name || '',
			last_name: user?.last_name || '',
			phone: phoneFormatter(user?.phone || ''),
		},
	});

	const credentialsForm = createCredentialsSchema({
		message: {
			confirm_password: 'Пароли не совпадают',
			new_password: 'Обязательное поле',
			old_password: 'Обязательное поле',
		},
	});

	const action_executes = {
		updateProfile: useAsyncAction<ProfileUpdateResponseModel, [Partial<User>]>({
			messages: viewModel.UpdateProfile,
		}),

		phone: {
			preVerification: useAsyncAction<CommonDataStringResponse, [void]>({}),
		},

		updateCredentials: useAsyncAction<
			CredentialsUpdateResponseModel,
			[CredentialsUpdateRequestModel]
		>({
			messages: viewModel.UpdateCredentials,
		}),

		logout: useAsyncAction<CommonResponse<null>, [void]>({
			messages: viewModel.Logout,
		}),
	};

	const actions = {
		updateProfileAction: createAction({
			requestAction: updateProfile,
		}),

		phone: {
			preVerification: createAction({
				requestAction: firstStepPhoneVerification,
				onSuccess: () => setIsPreVerificationExecuted(true),
				onError: () =>
					pushCommonToast('Ошибка при попытке подтвердить номер телефона', 'error'),
			}),
		},

		updateCredentialsAction: createAction({
			requestAction: updateCredentials,
			onSuccess: () => {
				router.push(PAGES.LOGIN);
			},
		}),

		logoutAction: createAction({
			requestAction: logout,
			onSuccess: () => {
				router.push(PAGES.LOGIN);
			},
		}),
	};

	const handlers: UpdateProfileContextType['actions'] = {
		onUpdateProfile: async (payload: Partial<User>) => {
			const { phone, ...rest } = payload;
			const payloadData = phone ? payload : rest;
			await action_executes.updateProfile.execute(actions.updateProfileAction, payloadData);
			updateProfileForm.reset({
				...payload,
			});
		},

		phone: {
			preVerification: {
				start: async () => {
					await action_executes.phone.preVerification.execute(
						actions.phone.preVerification,
					);
				},
				open: () => setIsPreVerificationOpen(true),
				close: () => setIsPreVerificationOpen(false),
			},
		},

		onUpdateCredentials: async (data: CredentialsUpdateRequestModel) => {
			await action_executes.updateCredentials.execute(actions.updateCredentialsAction, data);
		},

		onLogout: async () => {
			await action_executes.logout.execute(actions.logoutAction);
		},
	};

	const states: UpdateProfileContextType['states'] = {
		updateProfile: {
			form: updateProfileForm,
			isLoading: action_executes.updateProfile.isLoading,
		},
		credentials: { form: credentialsForm },
		phone: {
			preVerification: {
				isOpen: isPreVerificationOpen,
				isExecuted: isPreVerificationExecuted,
				isLoading: action_executes.phone.preVerification.isLoading,
			},
		},
	};

	return (
		<UpdateProfileContext.Provider
			value={{
				actions: handlers,
				states,
			}}
		>
			{children}
		</UpdateProfileContext.Provider>
	);
};

export const useUpdateProfileUseCase = (): UpdateProfileContextType => {
	const context = useContext(UpdateProfileContext);

	if (!context) {
		throw new Error('useUpdateProfileUseCase must be used within a UpdateProfileProvider');
	}
	return context;
};
