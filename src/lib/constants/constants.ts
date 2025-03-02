export const domain = 'soyuz.kg';
export const protocol = 'https';
export const sharedCookieDomain = '.example.local';

export const FETCH_API_URL = `${protocol}://${domain}/skgapi/v1`;
export const LOCAL_API_URL = 'http://sclub.example.local:3000/api';
export const CRYPTO_KEY = process.env.NEXT_PUBLIC_CRYPTO_KEY || '';

export enum COOKIES {
    NEXT_LOCALE = 'NEXT_LOCALE',
    SESSION = 'session',
    THEME = 'theme',
}

export const locales = ['ru', 'kg'];

export enum PAGES {
    HOME = '/',
    BENEFITS_MAP = '/benefits-map',
    LOGIN = '/auth/login',
    ABOUT = '/about',
    PROFILE = '/profile',
}

export enum URL_ENTITIES {
    LOGIN = '/auth/login',
    LOGOUT = '/auth/logout',
    REGISTER = '/auth/register',
    PROFILE = '/sys/users/me',
    REFRESH_TOKEN = '/auth/refresh-token',
}
