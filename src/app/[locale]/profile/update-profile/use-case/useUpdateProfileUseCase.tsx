'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { useRouter } from '@/i18n/routing';
import { PAGES, URL_ENTITIES, phoneFormatter } from '@/lib';
import { useUser } from '@/providers/user/user-provider';
import type {
	CredentialsUpdateRequestModel,
	CredentialsUpdateResponseModel,
	PhoneFirstStepVerificationResponseModel,
	PhoneSecondStepVerificationRequestModel,
	ProfileUpdateResponseModel,
} from '@/services';
import {
	firstStepPhoneVerification,
	secondStepPhoneVerification,
	updateCredentials,
	updateProfile,
} from '@/services/profile/profileService';
import {
	type CommonDataStringResponse,
	type ProfileFormValues,
	createAction,
	createCredentialsSchema,
	createProfileSchema,
	pushCommonToast,
	revalidateByTags,
	useAsyncAction,
} from '@common';
import {
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	createContext,
	useContext,
	useState,
} from 'react';

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
				requestId: string;
			};
		};
	};

	actions: {
		onUpdateProfile: (payload: ProfileFormValues) => Promise<void>;

		phone: {
			preVerification: {
				start: () => Promise<void>;
				open: () => void;
				close: () => void;
			};
			verificationCode: {
				code: string[];
				setCode: Dispatch<SetStateAction<string[]>>;
				error: string | null;
				setError: Dispatch<SetStateAction<string | null>>;
				isLoading: boolean;
				start: (code: string, requestId: string) => Promise<void>;
				close: () => void;
			};
		};
		onUpdateCredentials: (data: CredentialsUpdateRequestModel) => Promise<void>;
	};
}

const UpdateProfileContext = createContext<UpdateProfileContextType | undefined>(undefined);

export const UpdateProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const viewModel = useViewModel(['Toast', 'Validation']);

	const { user, setUser } = useUser();

	const router = useRouter();

	const [isPreVerificationOpen, setIsPreVerificationOpen] = useState(false);
	const [isPreVerificationExecuted, setIsPreVerificationExecuted] = useState(false);
	const [code, setCode] = useState('');
	const [requestId, setRequestId] = useState<string>('');
	const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(''));
	const [verificationError, setVerificationError] = useState<string | null>(null);

	const updateProfileForm = createProfileSchema({
		message: viewModel.Validation,
		defaultValues: {
			first_name: user?.first_name || '',
			last_name: user?.last_name || '',
			phone: phoneFormatter(user?.phone || ''),
			avatar: user?.avatar || '',
		},
	});

	const credentialsForm = createCredentialsSchema({
		message: viewModel.Validation,
	});

	const action_executes = {
		updateProfile: useAsyncAction<ProfileUpdateResponseModel, [ProfileFormValues]>({
			messages: viewModel.Toast.UpdateProfile,
		}),

		phone: {
			preVerification: useAsyncAction<PhoneFirstStepVerificationResponseModel, [unknown]>({}),
			verificationCode: useAsyncAction<
				CommonDataStringResponse,
				[PhoneSecondStepVerificationRequestModel]
			>({}),
		},

		updateCredentials: useAsyncAction<
			CredentialsUpdateResponseModel,
			[CredentialsUpdateRequestModel]
		>({
			messages: viewModel.Toast.UpdateCredentials,
		}),
	};

	const actions = {
		updateProfileAction: createAction({
			requestAction: updateProfile,
			onSuccess: () => {
				revalidateByTags([URL_ENTITIES.PROFILE]);
			},
		}),

		phone: {
			preVerification: createAction({
				requestAction: firstStepPhoneVerification,
				onSuccess: (data) => {
					setRequestId(data.data);
					setIsPreVerificationExecuted(true);
				},
				onError: () =>
					pushCommonToast('Ошибка при попытке подтвердить номер телефона', 'error'),
			}),
			verifyCode: () => Promise<void>,
			verificationCode: createAction({
				requestAction: secondStepPhoneVerification,
				onSuccess: () => {
					pushCommonToast('Телефон успешно подтверждён', 'success');
					setIsPreVerificationOpen(false);
					setRequestId('');
					setCode('');
				},
				onError: () => pushCommonToast('Ошибка при подтверждении кода', 'error'),
			}),
		},

		updateCredentialsAction: createAction({
			requestAction: updateCredentials,
			onSuccess: () => {
				router.push(PAGES.LOGIN);
			},
		}),
	};

	const handlers: UpdateProfileContextType['actions'] = {
		onUpdateProfile: async (payload: ProfileFormValues) => {
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
						[],
					);
				},
				open: () => setIsPreVerificationOpen(true),
				close: () => setIsPreVerificationOpen(false),
			},
			verificationCode: {
				code: verificationCode,
				setCode: setVerificationCode,
				isLoading: action_executes.phone.verificationCode.isLoading,
				error: verificationError,
				setError: setVerificationError,
				start: async (code: string, requestId: string) => {
					await action_executes.phone.verificationCode.execute(
						actions.phone.verificationCode,
						{ code, request_id: requestId },
					);
				},
				close: () => {
					setVerificationCode(Array(6).fill(''));
					setVerificationError(null);
				},
			},
		},

		onUpdateCredentials: async (data: CredentialsUpdateRequestModel) => {
			await action_executes.updateCredentials.execute(actions.updateCredentialsAction, data);
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
				requestId,
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
