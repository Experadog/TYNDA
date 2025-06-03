import { type NextRequest, NextResponse } from 'next/server';

import { type SupportedLanguages, routing } from '@/i18n/routing';
import { type Session, UserRole } from '@business-entities';
import { COOKIES } from '../config/cookies';
import { PAGES } from '../config/pages';
import { decryptData } from './decryptData';

const PUBLIC_FILE = /\.(.*)$/;
const PROTECTED_CLIENT_ROUTES = [PAGES.PROFILE, PAGES.DASHBOARD];

const PROTECTED_ESTABLISHER_WORKER_ROUTES = [PAGES.DASHBOARD_CHAT, PAGES.ROLES];
const PROTECTED_ESTABLISHER_ROUTES = [PAGES.USERS, PAGES.ROLES];
const PROTECTED_SUPER_USER_ROUTES = [PAGES.STAFF];

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

export function updateLocaleCookiesIfNeeded(
	req: NextRequest,
	res: NextResponse,
	shouldChangeBasePath: boolean,
): NextResponse {
	const currentPathLocale = getLocaleFromPath(req.nextUrl.pathname);
	const cookieLocale = req.cookies.get(COOKIES.NEXT_LOCALE)?.value;
	const locales = routing.locales;

	if (!currentPathLocale || !locales.includes(currentPathLocale)) {
		const url = req.nextUrl.clone();
		if (shouldChangeBasePath) {
			url.pathname = `/${cookieLocale}${PAGES.DASHBOARD}`;
		} else {
			url.pathname = `/${cookieLocale || 'ru'}`;
		}
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

export function isProtectedClientRoute(pathname: string): boolean {
	const basePath = pathname.replace(/^\/(ru|kg|en)\//, '/') as PAGES;
	return (
		PROTECTED_CLIENT_ROUTES.includes(basePath) ||
		PROTECTED_CLIENT_ROUTES.some((route) => basePath.includes(route))
	);
}

function dashboardRoleGuardian(basePath: string, isSuperUser: boolean, userRole: UserRole) {
	const checkIsProtectedRouteMatch = (protectedPath: string) =>
		basePath.startsWith(protectedPath) || basePath.includes(protectedPath);

	const isEstablisher = userRole === UserRole.ESTABLISHER;
	const isWorker = userRole === UserRole.ESTABLISHER_WORKER;

	const isWorkerProtected = PROTECTED_ESTABLISHER_WORKER_ROUTES.some(checkIsProtectedRouteMatch);
	const isEstablisherProtected = PROTECTED_ESTABLISHER_ROUTES.some(checkIsProtectedRouteMatch);
	const isSuperUserProtected = PROTECTED_SUPER_USER_ROUTES.some(checkIsProtectedRouteMatch);

	if (isWorker && isWorkerProtected) {
		return false;
	}

	if (isEstablisher && isEstablisherProtected) {
		return false;
	}

	if (isSuperUser && isSuperUserProtected) {
		return false;
	}

	return true;
}

export function checkRoleAccess(
	basePath: string,
	isSuperUser: boolean,
	userRole?: UserRole,
): string | null {
	if (
		(userRole && isSuperUser) ||
		userRole === UserRole.ESTABLISHER ||
		userRole === UserRole.ESTABLISHER_WORKER
	) {
		if (basePath.includes(PAGES.DASHBOARD)) {
			if (basePath === PAGES.DASHBOARD) return null;

			const isAllow = dashboardRoleGuardian(basePath, isSuperUser, userRole);

			if (isAllow) return null;

			return PAGES.DASHBOARD;
		}

		return PAGES.DASHBOARD;
	}

	if (basePath === PAGES.PROFILE) {
		if (userRole === UserRole.CLIENT && !isSuperUser) {
			return null;
		}

		return PAGES.HOME;
	}

	return null;
}

export function handleAuthRedirection(
	req: NextRequest,
	sessionData: Session | null,
): NextResponse | null {
	const { pathname, searchParams } = req.nextUrl;
	const basePath = pathname.replace(/^\/(ru|kg|en)\//, '/') as PAGES;
	const pathLocale = getLocaleFromPath(pathname) || 'ru';

	if (sessionData && basePath.startsWith('/auth')) {
		const redirectUrl = new URL(`/${pathLocale}${PAGES.PROFILE}`, req.url);
		return NextResponse.redirect(redirectUrl);
	}

	if (isProtectedClientRoute(pathname) && !sessionData) {
		const redirectUrl = new URL(`/${pathLocale}${PAGES.LOGIN}`, req.url);
		return NextResponse.redirect(redirectUrl);
	}

	if (
		sessionData?.user.role === UserRole.CLIENT &&
		!sessionData.user.is_superuser &&
		basePath.startsWith(PAGES.DASHBOARD)
	) {
		const redirectUrl = new URL(`/${pathLocale}${PAGES.PROFILE}`, req.url);
		return NextResponse.redirect(redirectUrl);
	}

	if (basePath.includes('/callback') && !searchParams.toString().includes('www.googleapis.com')) {
		const redirectUrl = new URL(`/${pathLocale}`, req.url);
		return NextResponse.redirect(redirectUrl);
	}

	return null;
}
