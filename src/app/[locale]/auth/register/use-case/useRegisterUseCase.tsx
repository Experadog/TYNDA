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
	const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
	const [focusIndex, setFocusIndex] = useState<number | null>(null);

	const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

	const viewModel = useViewModel(['Toast']);
	const router = useRouter();
	const { execute: registerExecute, isLoading: isRegisterLoading } = useAsyncAction<
		RegisterResponseModel,
		[RegisterClientRequestModel | RegisterEstablisherRequestModel]
	>({ messages: viewModel.Register });
	const { execute: activationExecute } = useAsyncAction<
		AccountActivationResponseModel,
		[AccountActivationRequestModel]
	>({
		messages: viewModel.ActivateAccount,
	});

	const onChangeRole = (newRole: UserRole) => setRole(newRole);

	const openConfirmModal = () => setIsConfirmModal(true);

	const closeConfirmModal = () => {
		setIsConfirmModal(false);
		setIsActivating(false);
		setCode([]);
	};

	const handleChange = (index: number, value: string) => {
		if (!/^\d*$/.test(value)) return;

		const newCode = [...code];
		const newValue = typeof Number(value.slice(-1)) === 'number' ? value.slice(-1) : '';
		console.log(newValue);
		newCode[index] = newValue;
		setCode(newCode);

		if (value && index < inputsRef.current.length - 1) {
			inputsRef.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
		const isNumberKey = /^[0-9]$/.test(e.key);
		const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];

		if (!isNumberKey && !allowedKeys.includes(e.key)) {
			e.preventDefault();
		}

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
		}

		if (e.key === 'ArrowLeft') {
			e.preventDefault();
			if (index > 0) {
				setFocusIndex(index - 1);
			}
		}
		if (e.key === 'ArrowRight') {
			e.preventDefault();
			if (index < inputsRef.current.length - 1) {
				setFocusIndex(index + 1);
			}
		}
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		const pasted = e.clipboardData.getData('Text').replace(/\D/g, '').slice(0, CODE_LENGTH);
		if (!pasted) return;

		const newCode = [...code];
		for (let i = 0; i < CODE_LENGTH; i++) {
			newCode[i] = pasted[i] || '';
			const input = inputsRef.current[i];

			if (input) {
				input.value = pasted[i].length > 1 ? pasted[i][0] : '';
			}
		}
		setCode(newCode);

		const nextIndex = pasted.length < CODE_LENGTH ? pasted.length : CODE_LENGTH - 1;
		inputsRef.current[nextIndex]?.focus();
	};

	useEffect(() => {
		if (focusIndex !== null) {
			inputsRef.current[focusIndex]?.focus();
			setFocusIndex(null); // сброс чтобы не зацикливать
		}
	}, [focusIndex]);

	const clientForm = createRegisterClientSchema({
		email: 'Почта является не корректной',
		password: 'Длинна пароля должна составлять минимум 6',
		confirm_password: 'Пароли не совпадают',
	});

	const partnerForm = createRegisterEstablisherSchema({
		email: 'Почта является не корректной',
		password: 'Длинна пароля должна составлять минимум 6',
		confirm_password: 'Пароли не совпадают',
		first_name: 'Это поле обязательное',
		last_name: 'Это поле обязательное',
	});

	const registerAction = createAction({
		requestAction: register,
		onSuccess: () => {
			setIsActivating(true);
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
