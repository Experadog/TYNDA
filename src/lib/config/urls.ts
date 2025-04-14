export enum URL_ENTITIES {
    //auth
    LOGIN = '/auth/login',
    LOGOUT = '/auth/logout',
    REFRESH_TOKEN = '/auth/refresh-token',
    CALLBACK_GOOGLE = '/auth/login/callback_from_google',

    //sys
    REGISTER = '/sys/users/register',
    PROFILE = '/sys/users/me',
    ACTIVATE_ACCOUNT = '/sys/users/activate',
    PHONE_PRE_VERIFY = '/sys/users/pre-verify-phone-telegram',
    UPDATE_CREDENTIALS = '/sys/users/password/reset',

    //biz
    CARD_HISTORY = '/biz/card_history/client-history',

    //base
    LOAD_FILE = '/base/resources',
}

export enum URL_LOCAL_ENTITIES {
    CLEAR_SESSION = '/clear-session',
    REFRESH_SESSION = '/refresh-session',
}
