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
import { setDefaultSettings } from './app/[locale]/dashboard/page-settings-actions';
import { clearCookie } from './common/actions/clear-cookie';
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

	// Аутентификация + Локализация и куки
	const sessionData = getSessionData(req);

	response = updateLocaleCookiesIfNeeded(
		req,
		response,
		Boolean(sessionData?.user.is_superuser || sessionData?.user.role === UserRole.ESTABLISHER),
	);

	const basePath = pathname.replace(/^\/(ru|kg)\//, '/') as PAGES;
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
		await clearCookie(COOKIES.USER_SETTINGS);
	}

	return response;
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/callback'],
};
