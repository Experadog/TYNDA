export type User = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    uuid: string;
    status: number;
    is_superuser: boolean;
    is_staff: boolean;
    is_multi_login: boolean;
    created_time: string;
    last_login_time: string;
    roles: [];
    card: null;
    establishment: null;
};

export type Credentials = {
    access_token: string;
    access_token_type: string;
    access_token_expire_time: string;
    refresh_token: string;
    refresh_token_type: string;
    refresh_token_expire_time: string;
};

export type Session = { user: User } & Credentials;
