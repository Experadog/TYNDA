'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { useRouter } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { AccountActivationRequestModel, AccountActivationResponseModel, activateAccount, register, RegisterClientRequestModel, RegisterEstablisherRequestModel, RegisterResponseModel } from '@/services';
import { UserRole } from '@business-entities';
import { createAction, createRegisterClientSchema, createRegisterEstablisherSchema, useAsyncAction } from '@common';
import React, { createContext, ReactNode, RefObject, useContext, useRef, useState } from 'react';

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
        handleKeyDown: (index: number, e: React.KeyboardEvent) => void;
    };
}

const RegisterContext = createContext<RegisterContextType | undefined>(undefined);

export const RegisterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isConfirmModal, setIsConfirmModal] = useState(false);
    const [isActivating, setIsActivating] = useState(false);
    const [role, setRole] = useState<UserRole>(UserRole.CLIENT);
    const [code, setCode] = useState(Array(6).fill(''));

    const viewModel = useViewModel(['Toast']);
    const router = useRouter();
    const { execute: registerExecute, isLoading: isRegisterLoading } = useAsyncAction<RegisterResponseModel, [RegisterClientRequestModel | RegisterEstablisherRequestModel]>({ messages: viewModel.Register });
    const { execute: activationExecute } = useAsyncAction<AccountActivationResponseModel, [AccountActivationRequestModel]>({
        messages: viewModel.ActivateAccount,
    });

    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const onChangeRole = (newRole: UserRole) => setRole(newRole);

    const openConfirmModal = () => setIsConfirmModal(true);

    const closeConfirmModal = () => {
        setIsConfirmModal(false);
        setIsActivating(false);
    };

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value.slice(-1);
        setCode(newCode);

        if (value && index < inputsRef.current.length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

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
        const data: AccountActivationRequestModel = { code: code.join(''), email: role === UserRole.CLIENT ? clientForm.getValues('email') : partnerForm.getValues('email') };

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
