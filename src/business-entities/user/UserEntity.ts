export type User = {
    id: string;
    first_name?: string;
    last_name?: string;
    email: string;
    phone: string;
    status: 'enable' | 'disable';
    is_superuser: boolean;
    is_staff: boolean;
    is_multi_login: boolean;
    is_phone_verified: boolean;
    created_time: string;
    last_login_time: string;
    role: UserRole;
    card: null;
    cached_permission_groups: {
        establishment: Partial<'crud'>;
        user: Partial<'crud'>;
    };
};

export enum UserRole {
    CLIENT = 'client',
    ESTABLISHER = 'establisher',
}

export type Credentials = {
    access_token: string;
    access_token_type: string;
    access_token_expire_time: string;
    refresh_token: string;
    refresh_token_type: string;
    refresh_token_expire_time: string;
};

export type Session = { user: User; last_refreshed: number } & Credentials;

export type ClientHistory = {
    image: string;
    title: string;
    category: string;
    location: string;
    rating: number;
    review_count: number;
};

export type BonusHistory = {
    image: string;
    title: string;
    category: string;
    location: string;
    date: string;
    discount: number;
};

export type UserReviews = {
    image: string;
    title: string;
    category: string;
    location: string;
    rating: number;
    text: string;
    date: string;
};
