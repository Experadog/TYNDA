export const domain = 'localhost:3000';
export const protocol = 'http';

export const API_URL = `${protocol}://${domain}/skgapi/v1`;
export const FETCH_API_RL = `${protocol}://${domain}`;

export enum COOKIES {
    NEXT_LOCALE = 'NEXT_LOCALE',
}

export const locales = ['ru', 'kg'];

export enum PAGES {
    HOME = '/',
    BENEFITS_MAP = '/benefits-map',
    LOGIN = '/login',
    ABOUT = '/about',
}
