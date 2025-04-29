import {
	type PAGES,
	checkRoleAccess,
	getSessionData,
	handleAuthRedirection,
	isStaticOrApiRequest,
	updateLocaleCookiesIfNeeded,
} from '@/lib';
import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';
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

	// Локализация и куки
	response = updateLocaleCookiesIfNeeded(req, response);

	// Аутентификация
	const sessionData = getSessionData(req);

	const basePath = pathname.replace(/^\/(ru|kg)\//, '/') as PAGES;
	const roleRedirectPath = checkRoleAccess(basePath, sessionData?.user.role);

	if (roleRedirectPath) {
		return NextResponse.redirect(new URL(roleRedirectPath, req.url));
	}

	const authRedirect = handleAuthRedirection(req, sessionData);
	if (authRedirect) {
		return authRedirect;
	}

	return response;
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/callback'],
};
