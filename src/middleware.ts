import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { COOKIES } from './lib';

const nextIntlMiddleware = createMiddleware({
    locales: ['ru', 'kg'],
    defaultLocale: 'ru',
    localeDetection: false,
});

const PUBLIC_FILE = /\.(.*)$/;

export default async function middleware(req: NextRequest): Promise<NextResponse> {
    if (
        req.nextUrl.pathname.startsWith('/_next') ||
        req.nextUrl.pathname.includes('/api/') ||
        req.nextUrl.pathname.includes('/skgapi/') ||
        PUBLIC_FILE.test(req.nextUrl.pathname)
    ) {
        return NextResponse.next();
    }

    const response = nextIntlMiddleware(req);

    const { pathname } = req.nextUrl;
    const locales = routing.locales;

    const localeCookie = req.cookies.get(COOKIES.NEXT_LOCALE);

    const pathLocale = pathname.split('/')[1];
    const validLocale = locales.includes(pathLocale);

    const validLocaleCookie = locales.includes(localeCookie?.value || '');

    if (!validLocale) {
        const url = req.nextUrl.clone();
        url.pathname = `/${validLocaleCookie ? localeCookie?.value : 'ru'}`;
        return NextResponse.redirect(url);
    }

    if (validLocale && localeCookie?.value !== pathLocale) {
        const response = NextResponse.next();
        response.cookies.set(COOKIES.NEXT_LOCALE, pathLocale, { path: '/' });
        return response;
    }

    if (!localeCookie || !locales.includes(localeCookie.value)) {
        const response = NextResponse.next();
        response.cookies.set('NEXT_LOCALE', 'ru', { path: '/' });
        return response;
    }

    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
