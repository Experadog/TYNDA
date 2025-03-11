export enum URL_ENTITIES {
    //auth
    LOGIN = '/auth/login',
    LOGOUT = '/auth/logout',
    REFRESH_TOKEN = '/auth/refresh-token',
    CALLBACK_GOOGLE = '/auth/login/callback_from_google',

    //sys
    REGISTER = '/sys/users/register',
    PROFILE = '/sys/users/me',
}

export enum URL_LOCAL_ENTITIES {
    CLEAR_SESSION = '/clear-session',
    REFRESH_SESSION = '/refresh-session',
}
