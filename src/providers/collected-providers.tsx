'use server';
import { COOKIES } from '@/lib';
import { cookies } from 'next/headers';
import { FC, ReactNode } from 'react';
import { LocaleProvider } from './locale/locale-provider';
import PushMessageProvider from './message/push-message-provider';
import RefreshOnExpire from './refresh-token/refresh-on-expire';
import { ThemeProvider } from './theme/theme-provider';
import { UserProvider } from './user/user-provider';

interface IProps {
    children: ReactNode;
}

const CollectedProviders: FC<IProps> = async ({ children }) => {
    const cookieStore = await cookies();
    const locale = (cookieStore.get('NEXT_LOCALE')?.value || 'ru') as Locale;
    const theme = cookieStore.get(COOKIES.THEME)?.value;
    const session = cookieStore.get(COOKIES.SESSION)?.value || '';

    return (
        <ThemeProvider
            attribute='class'
            defaultTheme={'system'}
            forcedTheme={theme}
            enableSystem
        >
            <PushMessageProvider>
                <LocaleProvider locale={locale}>
                    <UserProvider session={session}>
                        <RefreshOnExpire initialSession={session}>{children}</RefreshOnExpire>
                    </UserProvider>
                </LocaleProvider>
            </PushMessageProvider>
        </ThemeProvider>
    );
};

export default CollectedProviders;
