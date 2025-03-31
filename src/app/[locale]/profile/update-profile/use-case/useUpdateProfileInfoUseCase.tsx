'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { phoneFormatter } from '@/lib';
import { ProfileUpdateResponseModel } from '@/services';
import { updateProfile } from '@/services/profile/profileService';
import { User } from '@business-entities';
import { createAction, createProfileSchema, useAsyncAction } from '@common';
import { createContext, ReactNode, useContext, useState } from 'react';

interface UpdateProfileInfoContextType {
    states: {
        updateProfileForm: ReturnType<typeof createProfileSchema>;
    };

    actions: {
        onUpdateProfile: (payload: Partial<User>) => Promise<void>;
        activateProPhoneVerify: () => void;
        closePrePhoneVerify: () => void;
    };
}

const UpdateProfileInfoContext = createContext<
    UpdateProfileInfoContextType | undefined
>(undefined);

export const UpdateProfileProvider: React.FC<{
    children: ReactNode;
    user: User | null;
}> = ({ children, user }) => {
    const viewModel = useViewModel(['Toast']);

    const [isPrePhoneVerify, setIsPrePhoneVerify] = useState(false);

    const { execute: updateProfileExecute } = useAsyncAction<
        ProfileUpdateResponseModel,
        [Partial<User>]
    >({
        messages: viewModel.UpdateProfile,
    });

    const updateProfileAction = createAction({
        requestAction: updateProfile,
    });

    const onUpdateProfile = async (payload: Partial<User>) => {
        await updateProfileExecute(updateProfileAction, payload);
    };

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

    const activateProPhoneVerify = () => {
        setIsPrePhoneVerify(true);
    };

    const closePrePhoneVerify = () => {
        setIsPrePhoneVerify(false);
    };

    return (
        <UpdateProfileInfoContext.Provider
            value={{
                actions: {
                    onUpdateProfile,
                    activateProPhoneVerify,
                    closePrePhoneVerify,
                },
                states: {
                    updateProfileForm,
                },
            }}
        >
            {children}
        </UpdateProfileInfoContext.Provider>
    );
};

export const useUpdateProfileInfoUseCase = (): UpdateProfileInfoContextType => {
    const context = useContext(UpdateProfileInfoContext);

    if (!context) {
        throw new Error(
            'useUpdateProfileInfo must be used within a UpdateProfileProvider',
        );
    }
    return context;
};
