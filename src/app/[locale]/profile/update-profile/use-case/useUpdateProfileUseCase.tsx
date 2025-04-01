'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { phoneFormatter } from '@/lib';
import { ProfileUpdateResponseModel } from '@/services';
import { firstStepPhoneVerification, updateProfile } from '@/services/profile/profileService';
import { User } from '@business-entities';
import {
    CommonDataStringResponse,
    createAction,
    createProfileSchema,
    pushCommonToast,
    useAsyncAction,
} from '@common';
import { createContext, ReactNode, useContext, useState } from 'react';

interface UpdateProfileContextType {
    states: {
        updateProfile: {
            form: ReturnType<typeof createProfileSchema>;
            isLoading: boolean;
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
    };
}

const UpdateProfileContext = createContext<UpdateProfileContextType | undefined>(undefined);

export const UpdateProfileProvider: React.FC<{ children: ReactNode; user: User | null }> = ({
    children,
    user,
}) => {
    const viewModel = useViewModel(['Toast']);

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

    const action_executes = {
        updateProfile: useAsyncAction<ProfileUpdateResponseModel, [Partial<User>]>({
            messages: viewModel.UpdateProfile,
        }),

        phone: {
            preVerification: useAsyncAction<CommonDataStringResponse, [void]>({}),
        },
    };

    const actions = {
        updateProfile: createAction({
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
    };

    const handlers: UpdateProfileContextType['actions'] = {
        onUpdateProfile: async (payload: Partial<User>) => {
            const { phone, ...rest } = payload;
            const payloadData = phone ? payload : rest;
            await action_executes.updateProfile.execute(actions.updateProfile, payloadData);
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
    };

    const states: UpdateProfileContextType['states'] = {
        updateProfile: {
            form: updateProfileForm,
            isLoading: action_executes.updateProfile.isLoading,
        },
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
