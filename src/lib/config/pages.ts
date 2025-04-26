export enum PAGES {
    HOME = '/',
    BENEFITS_MAP = '/benefits-map',
    ABOUT = '/about',
    MAP = '/map',
    SERVICE = '/service',
    CONTACTS = '/contacts',
    CALLBACK = '/callback',
    SERVICES = '/services',

    // nested auth
    LOGIN = '/auth/login',
    REGISTER = '/auth/register',

    // nested profile
    PROFILE = '/profile',
    UPDATE_PROFILE = '/profile/update-profile',
    PROFILE_CREDENTIALS = '/profile/update-profile/credentials',
    PROFILE_TARIFF = '/profile/update-profile/tariff',
    PROFILE_CHAT = '/profile/update-profile/chat',
}

export const NAV_LINKS = [
    PAGES.HOME,
    PAGES.MAP,
    PAGES.ABOUT,
    PAGES.SERVICE,
    PAGES.CONTACTS,
    PAGES.SERVICES,
];
export const PROFILE_LINKS = [
    PAGES.UPDATE_PROFILE,
    PAGES.PROFILE_CREDENTIALS,
    PAGES.PROFILE_TARIFF,
    PAGES.PROFILE_CHAT,
];
