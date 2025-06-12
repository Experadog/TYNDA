'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { useRouter } from '@/i18n/routing';
import { PAGES } from '@/lib';
import {
	type AccountActivationRequestModel,
	type AccountActivationResponseModel,
	type RegisterClientRequestModel,
	type RegisterEstablisherRequestModel,
	type RegisterResponseModel,
	activateAccount,
	register,
} from '@/services';
import { UserRole } from '@business-entities';
import {
	createAction,
	createRegisterClientSchema,
	createRegisterEstablisherSchema,
	useAsyncAction,
} from '@common';
import type React from 'react';
import {
	type ReactNode,
	type RefObject,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';

interface RegisterContextType {
	states: {
		clientForm: ReturnType<typeof createRegisterClientSchema>;
		partnerForm: ReturnType<typeof createRegisterEstablisherSchema>;
		isConfirmModal: boolean;
		role: UserRole;
		isRegisterLoading: boolean;
		isActivating: boolean;
		inputsRef: RefObject<(HTMLInputElement | null)[]>;
		code: string[];
	};

	actions: {
		openConfirmModal: () => void;
		closeConfirmModal: () => void;
		onChangeRole: (newRole: UserRole) => void;
		onRegisterClient: (values: RegisterClientRequestModel) => Promise<void>;
		onRegisterEstablisher: (values: RegisterEstablisherRequestModel) => Promise<void>;
		onConfirm: () => Promise<void>;
		openAndTriggerConfirmModal: () => Promise<void>;
		handleChange: (index: number, value: string) => void;
		handleKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
		handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
	};
}

const RegisterContext = createContext<RegisterContextType | undefined>(undefined);

export const RegisterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isConfirmModal, setIsConfirmModal] = useState(false);
	const [isActivating, setIsActivating] = useState(false);
	const [role, setRole] = useState<UserRole>(UserRole.CLIENT);

	const CODE_LENGTH = 6;
	const DEFAULT_CODE = Array(CODE_LENGTH).fill('');
	const [code, setCode] = useState<string[]>(DEFAULT_CODE);
	const [focusIndex, setFocusIndex] = useState<number | null>(null);

	const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

	const { Toast, Validation } = useViewModel(['Toast', 'Validation']);
	const router = useRouter();
	const { execute: registerExecute, isLoading: isRegisterLoading } = useAsyncAction<
		RegisterResponseModel,
		[RegisterClientRequestModel | RegisterEstablisherRequestModel]
	>({ messages: Toast.Register });
	const { execute: activationExecute } = useAsyncAction<
		AccountActivationResponseModel,
		[AccountActivationRequestModel]
	>({
		messages: Toast.ActivateAccount,
	});

	const onChangeRole = (newRole: UserRole) => setRole(newRole);

	const openConfirmModal = () => setIsConfirmModal(true);

	const closeConfirmModal = () => {
		setIsConfirmModal(false);
		setIsActivating(false);
		setCode(DEFAULT_CODE);
	};
	const handleChange = (index: number, value: string) => {
		const sanitizedValue = value.replace(/\D/g, '');

		if (!sanitizedValue) return;

		const newCode = [...code];
		newCode[index] = sanitizedValue[0];

		setCode(newCode);

		if (index < CODE_LENGTH - 1) {
			setFocusIndex(index + 1);
		}
	};

	const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Backspace') {
			e.preventDefault();

			const newCode = [...code];

			if (code[index]) {
				newCode[index] = '';
				setCode(newCode);
				setFocusIndex(index);
			} else if (index > 0) {
				newCode[index - 1] = '';
				setCode(newCode);
				setFocusIndex(index - 1);
			} else {
				setFocusIndex(index);
			}
		} else if (e.key === 'ArrowLeft') {
			e.preventDefault();
			if (index > 0) setFocusIndex(index - 1);
		} else if (e.key === 'ArrowRight') {
			e.preventDefault();
			if (index < inputsRef.current.length - 1) setFocusIndex(index + 1);
		}
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();

		const pastedText = e.clipboardData.getData('Text').replace(/\D/g, '').slice(0, CODE_LENGTH);

		if (!pastedText) return;

		const newCode = [...code];
		const startIndex = Number.parseInt(e.currentTarget.dataset.index || '0');

		let lastFilledIndex = startIndex - 1;

		for (let i = 0; i < pastedText.length && startIndex + i < CODE_LENGTH; i++) {
			newCode[startIndex + i] = pastedText[i];
			lastFilledIndex = startIndex + i;
		}

		for (let i = lastFilledIndex + 1; i < CODE_LENGTH; i++) {
			newCode[i] = '';
		}

		setCode(newCode);

		let nextFocusIndex = lastFilledIndex;
		if (lastFilledIndex < CODE_LENGTH - 1) {
			nextFocusIndex = lastFilledIndex + 1;
		}

		setFocusIndex(nextFocusIndex);
	};

	useEffect(() => {
		if (focusIndex !== null && inputsRef.current[focusIndex]) {
			const timer = setTimeout(() => {
				inputsRef.current[focusIndex]?.focus();
				setFocusIndex(null);
			}, 0);
			return () => clearTimeout(timer);
		}
	}, [focusIndex]);

	const clientForm = createRegisterClientSchema(Validation);

	const partnerForm = createRegisterEstablisherSchema(Validation);

	const registerAction = createAction({
		requestAction: register,

		onSuccess: () => {
			setIsActivating(true);
		},
		onError: () => {
			closeConfirmModal();
		},
	});

	const activateAccountAction = createAction({
		requestAction: activateAccount,
		onSuccess: () => {
			router.push(PAGES.LOGIN);
		},
	});

	const onRegisterClient = async (values: RegisterClientRequestModel) => {
		const { confirm_password, ...rest } = values;
		await registerExecute(registerAction, rest);
	};

	const onRegisterEstablisher = async (values: RegisterEstablisherRequestModel) => {
		const { confirm_password, ...rest } = values;
		await registerExecute(registerAction, rest);
	};

	const onActivateAccount = async () => {
		const data: AccountActivationRequestModel = {
			code: code.join(''),
			email:
				role === UserRole.CLIENT
					? clientForm.getValues('email')
					: partnerForm.getValues('email'),
		};

		await activationExecute(activateAccountAction, data);
	};

	const onConfirm = async () => {
		if (isActivating) {
			await onActivateAccount();
		} else {
			if (role === UserRole.CLIENT) {
				await clientForm.handleSubmit(onRegisterClient)();
			} else {
				await partnerForm.handleSubmit(onRegisterEstablisher)();
			}
		}
	};

	const openAndTriggerConfirmModal = async () => {
		if (role === UserRole.CLIENT) {
			const isValid = await clientForm.trigger();
			clientForm.setFocus('email');
			if (isValid) {
				openConfirmModal();
			}
		} else {
			const isValid = await partnerForm.trigger();
			if (isValid) {
				openConfirmModal();
			}
		}
	};

	return (
		<RegisterContext.Provider
			value={{
				states: {
					clientForm,
					partnerForm,
					isConfirmModal,
					role,
					isRegisterLoading,
					isActivating,
					code,
					inputsRef,
				},

				actions: {
					onConfirm,
					openConfirmModal,
					onRegisterClient,
					onRegisterEstablisher,
					closeConfirmModal,
					onChangeRole,
					openAndTriggerConfirmModal,
					handleChange,
					handleKeyDown,
					handlePaste,
				},
			}}
		>
			{children}
		</RegisterContext.Provider>
	);
};

export const useRegisterUseCase = (): RegisterContextType => {
	const context = useContext(RegisterContext);
	if (!context) {
		throw new Error('useRegister must be used within a RegisterProvider');
	}
	return context;
};
