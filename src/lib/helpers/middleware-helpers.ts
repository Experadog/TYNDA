import { type NextRequest, NextResponse } from 'next/server';

import { type SupportedLanguages, routing } from '@/i18n/routing';
import { type Session, UserRole } from '@business-entities';
import { COOKIES } from '../config/cookies';
import { googleGuardUrlPath } from '../config/oauth';
import { PAGES } from '../config/pages';
import { decryptData } from './decryptData';

const PUBLIC_FILE = /\.(.*)$/;
const protectedClientRoutes = [PAGES.PROFILE];

export function isStaticOrApiRequest(pathname: string): boolean {
	return (
		pathname.startsWith('/_next') ||
		pathname.includes('/api/') ||
		pathname.includes('/skgapi/') ||
		PUBLIC_FILE.test(pathname)
	);
}

export function getLocaleFromPath(pathname: string): SupportedLanguages | undefined {
	const [_, locale] = pathname.split('/');
	return locale as SupportedLanguages;
}

export function getValidLocale(req: NextRequest): SupportedLanguages {
	const pathLocale: SupportedLanguages | undefined = getLocaleFromPath(req.nextUrl.pathname);
	const cookieLocale = req.cookies.get(COOKIES.NEXT_LOCALE)?.value as
		| SupportedLanguages
		| undefined;
	const locales = routing.locales;

	if (pathLocale && locales.includes(pathLocale)) {
		return pathLocale;
	}

	if (cookieLocale && locales.includes(cookieLocale)) {
		return cookieLocale;
	}

	return 'ru';
}

export function updateLocaleCookiesIfNeeded(req: NextRequest, res: NextResponse): NextResponse {
	const currentPathLocale = getLocaleFromPath(req.nextUrl.pathname);
	const cookieLocale = req.cookies.get(COOKIES.NEXT_LOCALE)?.value;
	const locales = routing.locales;

	if (!currentPathLocale || !locales.includes(currentPathLocale)) {
		const url = req.nextUrl.clone();
		url.pathname = `/${cookieLocale || 'ru'}`;
		return NextResponse.redirect(url);
	}

	if (cookieLocale !== currentPathLocale) {
		res.cookies.set(COOKIES.NEXT_LOCALE, currentPathLocale, { path: '/', sameSite: 'lax' });
	}

	return res;
}

export function getSessionData(req: NextRequest): Session | null {
	const sessionCookie = req.cookies.get(COOKIES.SESSION)?.value;
	return sessionCookie ? decryptData(sessionCookie) : null;
}

export function isProtectedRoute(pathname: string): boolean {
	const basePath = pathname.replace(/^\/(ru|kg)\//, '/') as PAGES;
	return (
		protectedClientRoutes.includes(basePath) ||
		protectedClientRoutes.some((route) => basePath.includes(route))
	);
}

export function checkRoleAccess(basePath: string, userRole?: UserRole): string | null {
	if (basePath.startsWith(PAGES.DASHBOARD) && userRole !== UserRole.ESTABLISHER) {
		return PAGES.HOME;
	}

	if (basePath.startsWith(PAGES.PROFILE) && userRole !== UserRole.CLIENT) {
		return PAGES.HOME;
	}

	return null;
}

export function handleAuthRedirection(
	req: NextRequest,
	sessionData: Session | null,
): NextResponse | null {
	const { pathname, searchParams } = req.nextUrl;
	const basePath = pathname.replace(/^\/(ru|kg)\//, '/') as PAGES;
	const pathLocale = getLocaleFromPath(pathname) || 'ru';

	if (sessionData && basePath.startsWith('/auth')) {
		const redirectUrl = new URL(`/${pathLocale}${PAGES.PROFILE}`, req.url);
		return NextResponse.redirect(redirectUrl);
	}

	if (isProtectedRoute(pathname) && !sessionData) {
		const redirectUrl = new URL(`/${pathLocale}${PAGES.LOGIN}`, req.url);
		return NextResponse.redirect(redirectUrl);
	}

	if (basePath.includes('/callback') && !searchParams.toString().includes(googleGuardUrlPath)) {
		const redirectUrl = new URL(`/${pathLocale}`, req.url);
		return NextResponse.redirect(redirectUrl);
	}

	return null;
}
