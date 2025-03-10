import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export function defaultCookieConfig(expires?: Date): Partial<ResponseCookie> {
    return {
        path: '/',
        sameSite: 'lax',
        expires,
    };
}
