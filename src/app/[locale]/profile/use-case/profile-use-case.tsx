'use client';

import {
    ClientHistoryResponseModel,
    loadFile,
    LoadFileRequestModel,
    LoadFileResponseModel,
} from '@/services';
import { getClientHistory } from '@/services/profile/profileService';
import { createAction, useAsyncAction } from '@common';
import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface ProfileContextType {
    states: {
        clientHistory: ClientHistoryResponseModel;
        isAvatarUpdating: boolean;
    };
    actions: {
        moveToNextClientHistory: () => Promise<void>;
        openAvatarUpdating: () => void;
        closeAvatarUpdating: () => void;
        onUpdateAvatar: (data: LoadFileRequestModel) => Promise<void>;
    };
}

interface ContextProps {
    children: ReactNode;
    clientHistoryResponse: ClientHistoryResponseModel;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileContextProvider: FC<ContextProps> = ({ children, clientHistoryResponse }) => {
    const [clientHistory, setClientHistory] = useState(clientHistoryResponse);
    const [isAvatarUpdating, setIsAvatarUpdating] = useState(false);

    const openAvatarUpdating = () => setIsAvatarUpdating(true);
    const closeAvatarUpdating = () => setIsAvatarUpdating(false);

    const { execute: loadFileExecute } = useAsyncAction<
        LoadFileResponseModel,
        [LoadFileRequestModel]
    >({
        messages: {
            error: 'Ошибка при попытке обновить фото профиля',
            loading: 'Загрузка...',
            success: 'Фото профиля успешно обновлено!',
        },
    });

    const updateAvatarAction = createAction({
        requestAction: loadFile,
    });

    const onUpdateAvatar = async (data: LoadFileRequestModel) => {
        await loadFileExecute(updateAvatarAction, data);
    };

    const moveToNextClientHistory = async () => {
        const nextPage = clientHistory.data.page + 1;

        if (clientHistory.data.items.length === clientHistory.data.total) return;

        const nextPageData = await getClientHistory({ page: nextPage.toString() });

        setClientHistory((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                page: nextPage,
                items: [...prevState.data.items, ...nextPageData.data.items],
            },
        }));
    };

    return (
        <ProfileContext.Provider
            value={{
                actions: {
                    moveToNextClientHistory,
                    closeAvatarUpdating,
                    openAvatarUpdating,
                    onUpdateAvatar,
                },
                states: {
                    clientHistory,
                    isAvatarUpdating,
                },
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfileUseCase = (): ProfileContextType => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfileUseCase must be used within a RegisterProvider');
    }

    return context;
};
