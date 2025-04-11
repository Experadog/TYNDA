'use client';

import { ClientHistoryResponseModel } from '@/services';
import { getClientHistory } from '@/services/profile/profileService';
import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface ProfileContextType {
    states: {
        clientHistory: ClientHistoryResponseModel;
    };
    actions: {
        moveToNextClientHistory: () => Promise<void>;
    };
}

interface ContextProps {
    children: ReactNode;
    clientHistoryResponse: ClientHistoryResponseModel;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileContextProvider: FC<ContextProps> = ({ children, clientHistoryResponse }) => {
    const [clientHistory, setClientHistory] = useState(clientHistoryResponse);

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
                },
                states: {
                    clientHistory,
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
