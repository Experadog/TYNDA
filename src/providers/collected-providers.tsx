'use server';
import { COOKIES } from '@/lib';
import { ErrorBoundary } from '@common';
import { TooltipProvider } from '@components';
import { cookies } from 'next/headers';
import type { FC, ReactNode } from 'react';
import { ChatWebSocketProvider } from './chat-webscoket/chat-webscoket-provider';
import { LocaleProvider } from './locale/locale-provider';
import OAuthProvider from './oAuth/oAuth-provider';
import { PermissionProvider } from './permission-provider/permission-provider';
import { ThemeProvider } from './theme/theme-provider';
import { ToastClientProvider } from './toast-provider/toast-provider';
import { UserProvider } from './user/user-provider';

interface IProps {
	children: ReactNode;
}

const CollectedProviders: FC<IProps> = async ({ children }) => {
	const cookieStore = await cookies();
	const locale = (cookieStore.get(COOKIES.NEXT_LOCALE)?.value || 'ru') as Locale;
	const theme = cookieStore.get(COOKIES.THEME)?.value as Theme;
	const session = cookieStore.get(COOKIES.SESSION)?.value || '';
	const staff_establishment = cookieStore.get(COOKIES.STAFF_ESTABLISHMENT)?.value || '';

	return (
		<ErrorBoundary>
			<ThemeProvider
				attribute="class"
				defaultTheme={'system'}
				forcedTheme={theme}
				enableSystem
				theme={theme}
			>
				<OAuthProvider>
					<LocaleProvider locale={locale}>
						<PermissionProvider session={session}>
							<UserProvider
								session={session}
								staff_establishment={staff_establishment}
							>
								<ChatWebSocketProvider session={session}>
									<ToastClientProvider theme={theme} />
									<TooltipProvider>{children}</TooltipProvider>
								</ChatWebSocketProvider>
							</UserProvider>
						</PermissionProvider>
					</LocaleProvider>
				</OAuthProvider>
			</ThemeProvider>
		</ErrorBoundary>
	);
};

export default CollectedProviders;
