'use client';

import FpsShow from '@/components/fps-show/fps-show';
import React, { createContext, ReactNode, useContext } from 'react';

type LocaleContextType = {
    locale: Locale;
};

const LocaleContext = createContext<LocaleContextType>({ locale: 'ru' });

export const LocaleProvider: React.FC<{ children: ReactNode; locale: Locale }> = ({
    children,
    locale,
}) => {
    return (
        <LocaleContext.Provider value={{ locale }}>
            {children}
            <FpsShow />
        </LocaleContext.Provider>
    );
};

export const useLocale = () => useContext(LocaleContext);
