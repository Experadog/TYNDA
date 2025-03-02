'use client';

import { SnackbarProvider } from 'notistack';
import { FC, ReactNode } from 'react';

interface IProps {
    children: ReactNode;
}

const PushMessageProvider: FC<IProps> = ({ children }) => {
    return (
        <>
            <SnackbarProvider />
            {children}
        </>
    );
};

export default PushMessageProvider;
