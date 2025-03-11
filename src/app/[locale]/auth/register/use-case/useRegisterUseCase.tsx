'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { register, RegisterClientRequestModel, RegisterEstablisherRequestModel, RegisterResponseModel } from '@/services';
import { UserRole } from '@business-entities';
import { createAction, createRegisterClientSchema, createRegisterEstablisherSchema, useAsyncAction } from '@common';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface RegisterContextType {
    states: {
        clientForm: ReturnType<typeof createRegisterClientSchema>;
        partnerForm: ReturnType<typeof createRegisterEstablisherSchema>;
        isConfirmModal: boolean;
        role: UserRole;
        isRegisterLoading: boolean;
    };

    actions: {
        openConfirmModal: () => void;
        closeConfirmModal: () => void;
        onChangeRole: (newRole: UserRole) => void;
        onRegisterClient: (values: RegisterClientRequestModel) => Promise<void>;
        onRegisterEstablisher: (values: RegisterEstablisherRequestModel) => Promise<void>;
        onConfirm: () => Promise<void>;
        openAndTriggerConfirmModal: () => Promise<void>;
    };
}

const RegisterContext = createContext<RegisterContextType | undefined>(undefined);

export const RegisterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isConfirmModal, setIsConfirmModal] = useState(false);
    const [role, setRole] = useState<UserRole>(UserRole.CLIENT);

    const viewModel = useViewModel(['Toast']);
    const { execute: registerExecute, isLoading: isRegisterLoading } = useAsyncAction<RegisterResponseModel, [RegisterClientRequestModel | RegisterEstablisherRequestModel]>({ messages: viewModel.Register });

    const onChangeRole = (newRole: UserRole) => setRole(newRole);

    const openConfirmModal = () => setIsConfirmModal(true);
    const closeConfirmModal = () => setIsConfirmModal(false);

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
        onSuccess: (response) => {
            console.log(response);
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

    const onConfirm = async () => {
        if (role === UserRole.CLIENT) {
            await clientForm.handleSubmit(onRegisterClient)();
        }
    };

    const openAndTriggerConfirmModal = async () => {
        clientForm.clearErrors();
        const isValid = await clientForm.trigger();
        if (isValid) {
            openConfirmModal();
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
                },

                actions: {
                    onConfirm,
                    openConfirmModal,
                    onRegisterClient,
                    onRegisterEstablisher,
                    closeConfirmModal,
                    onChangeRole,
                    openAndTriggerConfirmModal,
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
