import { COOKIES, decryptData, PAGES } from '@/lib';
import { UserRole } from '@business-entities';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const nextIntlMiddleware = createMiddleware({
    locales: ['ru', 'kg'],
    defaultLocale: 'ru',
    localeDetection: false,
});

const PUBLIC_FILE = /\.(.*)$/;
const protectedClientRoutes = [PAGES.PROFILE];

export default async function middleware(req: NextRequest): Promise<NextResponse> {
    const { pathname } = req.nextUrl;

    // Пропускаем запросы для статических файлов, API и других исключений
    if (
        pathname.startsWith('/_next') ||
        pathname.includes('/api/') ||
        pathname.includes('/skgapi/') ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    const response = nextIntlMiddleware(req);

    // Получаем информацию о локализации
    const locales = routing.locales;
    const localeCookie = req.cookies.get(COOKIES.NEXT_LOCALE);
    const pathLocale = pathname.split('/')[1];
    const validLocale = locales.includes(pathLocale);
    const validLocaleCookie = locales.includes(localeCookie?.value || '');

    // Переадресация на правильный язык, если локаль неверная
    if (!validLocale) {
        const url = req.nextUrl.clone();
        url.pathname = `/${validLocaleCookie ? localeCookie?.value : 'ru'}`;
        return NextResponse.redirect(url);
    }

    // Обновляем куку с языком, если она отличается от текущего пути
    if (validLocale && localeCookie?.value !== pathLocale) {
        response.cookies.set(COOKIES.NEXT_LOCALE, pathLocale, {
            path: '/',
            sameSite: 'lax',
        });
        return response;
    }

    // Устанавливаем дефолтную локаль в куку, если кука не установлена или содержит некорректное значение
    if (!localeCookie || !locales.includes(localeCookie.value)) {
        response.cookies.set(COOKIES.NEXT_LOCALE, 'ru', {
            path: '/',
            sameSite: 'lax',
        });
        return response;
    }

    // Проверка, если это защищенная страница
    const basePath = req.nextUrl.pathname.replace(/^\/(ru|kg)\//, '/') as PAGES;
    const isProtectedClientRoute =
        protectedClientRoutes.includes(basePath) ||
        protectedClientRoutes.some((route) => basePath.includes(route));

    const sessionCookieValue = req.cookies.get(COOKIES.SESSION)?.value || '';
    const sessionData = sessionCookieValue ? decryptData(sessionCookieValue) : null;

    if (sessionData?.user.role === UserRole.ESTABLISHER && isProtectedClientRoute) {
        const redirectUrl = new URL(`/${pathLocale}${PAGES.HOME}`, req.url);
        return NextResponse.redirect(redirectUrl);
    }

    if (sessionData && basePath.startsWith('/auth')) {
        const redirectUrl = new URL(`/${pathLocale}${PAGES.PROFILE}`, req.url);
        return NextResponse.redirect(redirectUrl);
    }

    if (isProtectedClientRoute && !sessionData) {
        return NextResponse.redirect(new URL(`/${pathLocale}${PAGES.LOGIN}`, req.url));
    }

    if (basePath.includes('/callback')) {
        const queryString = req.nextUrl.searchParams.toString();
        if (
            !queryString.includes(
                'email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=consent',
            )
        ) {
            return NextResponse.redirect(new URL(`/${pathLocale}`, req.url));
        }
    }

    return response; 
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/callback'],
};
