'use client';

import { createContext, FC, ReactNode, useContext } from 'react';

interface ProfileContextType {
    states: {};
    actions: {};
}

interface ContextProps {
    children: ReactNode;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileContextProvider: FC<ContextProps> = ({ children }) => {
    return <ProfileContext.Provider value={{ actions: {}, states: {} }}>{children}</ProfileContext.Provider>;
};

export const useProfileUseCase = (): ProfileContextType => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfileUseCase must be used within a RegisterProvider');
    }

    return context;
};
