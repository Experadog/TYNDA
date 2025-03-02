import { COOKIES, decryptData, PAGES, sharedCookieDomain } from '@/lib';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const nextIntlMiddleware = createMiddleware({
    locales: ['ru', 'kg'],
    defaultLocale: 'ru',
    localeDetection: false,
});

const PUBLIC_FILE = /\.(.*)$/;
const protectedRoutes = [PAGES.PROFILE];

export default async function middleware(req: NextRequest): Promise<NextResponse> {
    const { pathname } = req.nextUrl;

    // Пропуск маршрутов для Next.js, API, изображений и статических файлов
    if (
        pathname.startsWith('/_next') ||
        pathname.includes('/api/') ||
        pathname.includes('/skgapi/') ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    const response = nextIntlMiddleware(req);

    // // Получаем информацию о локализации
    const locales = routing.locales;
    const localeCookie = req.cookies.get(COOKIES.NEXT_LOCALE);
    const pathLocale = pathname.split('/')[1];
    const validLocale = locales.includes(pathLocale);
    const validLocaleCookie = locales.includes(localeCookie?.value || '');

    // Переадресация на правильный язык
    if (!validLocale) {
        const url = req.nextUrl.clone();
        url.pathname = `/${validLocaleCookie ? localeCookie?.value : 'ru'}`;
        return NextResponse.redirect(url);
    }

    if (validLocale && localeCookie?.value !== pathLocale) {
        response.cookies.set(COOKIES.NEXT_LOCALE, pathLocale, {
            path: '/',
            domain: sharedCookieDomain,
            sameSite: 'lax',
        });
        return response;
    }

    if (!localeCookie || !locales.includes(localeCookie.value)) {
        response.cookies.set(COOKIES.NEXT_LOCALE, 'ru', {
            path: '/',
            domain: sharedCookieDomain,
            sameSite: 'lax',
        });
        return response;
    }

    // Защищенные маршруты
    const basePath = req.nextUrl.pathname.replace(/^\/(ru|kg)\//, '/') as PAGES;
    const isProtectedRoute = protectedRoutes.includes(basePath);
    if (isProtectedRoute) {
        return checkPrivateRoutes(req);
    }

    return response;
}

async function checkPrivateRoutes(req: NextRequest): Promise<NextResponse> {
    const sessionCookie = req.cookies.get(COOKIES.SESSION);

    if (!sessionCookie || !sessionCookie.value) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    try {
        const sessionData = decryptData(sessionCookie.value);

        if (!sessionData) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    } catch (error) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
