'use server';
import { COOKIES } from '@/lib';
import { ErrorBoundary } from '@common';
import { TooltipProvider } from '@components';
import { cookies } from 'next/headers';
import type { FC, ReactNode } from 'react';
import CacheRevalidate from './cache-revalidate/cache-revalidate';
import { ChatWebSocketProvider } from './chat-webscoket/chat-webscoket-provider';
import { LocaleProvider } from './locale/locale-provider';
import NetworkStatusProvider from './network-status-provoder/network-status-provoder';
import OAuthProvider from './oAuth/oAuth-provider';
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

	return (
		<ErrorBoundary>
			<NetworkStatusProvider>
				<ThemeProvider
					attribute="class"
					defaultTheme={'system'}
					forcedTheme={theme}
					enableSystem
					theme={theme}
				>
					<OAuthProvider>
						<LocaleProvider locale={locale}>
							<UserProvider session={session}>
								<ChatWebSocketProvider session={session}>
									<ToastClientProvider theme={theme} />
									<CacheRevalidate />
									<TooltipProvider>{children}</TooltipProvider>
								</ChatWebSocketProvider>
							</UserProvider>
						</LocaleProvider>
					</OAuthProvider>
				</ThemeProvider>
			</NetworkStatusProvider>
		</ErrorBoundary>
	);
};

export default CollectedProviders;
