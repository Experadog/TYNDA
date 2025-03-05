export const sharedCookieDomain = process.env.NEXT_PUBLIC_SHARED_COOKIE_DOMAIN;
export const REFRESH_INTERVAL_GUARD = 20 * 1000;

export enum COOKIES {
    NEXT_LOCALE = 'NEXT_LOCALE',
    SESSION = 'session',
    THEME = 'theme',
}
