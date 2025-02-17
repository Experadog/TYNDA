'use server';
import { cookies } from 'next/headers';
import { FC, ReactNode } from 'react';
import { LocaleProvider } from './locale-provider';
import { ThemeProvider } from './theme-provider';

interface IProps {
    children: ReactNode;
}

const CollectedProviders: FC<IProps> = async ({ children }) => {
    const cookieStore = cookies();
    const locale = ((await cookieStore).get('NEXT_LOCALE')?.value || 'ru') as Locale;

    return (
        <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
        >
            <LocaleProvider locale={locale}>{children}</LocaleProvider>
        </ThemeProvider>
    );
};

export default CollectedProviders;
