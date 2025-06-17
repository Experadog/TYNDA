import {
	COOKIES,
	PAGES,
	checkRoleAccess,
	getSessionData,
	handleAuthRedirection,
	isStaticOrApiRequest,
	updateLocaleCookiesIfNeeded,
} from '@/lib';
import { UserRole } from '@business-entities';
import { getCookie } from '@common';
import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';
import { setDefaultSettings } from './app/[locale]/dashboard/settings';
import { supportedLanguages } from './i18n/routing';

const nextIntlMiddleware = createMiddleware({
	locales: supportedLanguages,
	defaultLocale: 'ru',
	localeDetection: false,
});

export default async function middleware(req: NextRequest): Promise<NextResponse> {
	const { pathname } = req.nextUrl;

	if (isStaticOrApiRequest(pathname)) {
		return NextResponse.next();
	}

	let response = nextIntlMiddleware(req);

	const cookieHeader = req.headers.get('cookie') || '';
	const themeCookieMatch = cookieHeader.match(/theme=(dark|light)/);
	const theme = themeCookieMatch ? themeCookieMatch[1] : 'light';

	response.cookies.set({
		name: COOKIES.THEME,
		value: theme,
		path: '/',
		sameSite: 'lax',
	});

	// Аутентификация + Локализация и куки
	const sessionData = getSessionData(req);

	response = updateLocaleCookiesIfNeeded(
		req,
		response,
		Boolean(sessionData?.user.is_superuser || sessionData?.user.role === UserRole.ESTABLISHER),
	);

	const basePath = pathname.replace(/^\/(ru|kg|en)\//, '/') as PAGES;
	const roleRedirectPath = checkRoleAccess(
		basePath,
		sessionData?.user.is_superuser || false,
		sessionData?.user.role,
	);

	if (roleRedirectPath) {
		return NextResponse.redirect(new URL(roleRedirectPath, req.url));
	}

	const authRedirect = handleAuthRedirection(req, sessionData);
	if (authRedirect) {
		return authRedirect;
	}

	if (basePath.startsWith(PAGES.DASHBOARD)) {
		const settings = await getCookie(COOKIES.USER_SETTINGS, true);

		if (!settings) {
			await setDefaultSettings();
		}
	} else {
		response.cookies.delete(COOKIES.USER_SETTINGS);
	}

	return response;
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/callback'],
};
