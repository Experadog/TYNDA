import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { sharedCookieDomain } from '../config/cookies';

export function sharedCookieConfig(expires?: Date): Partial<ResponseCookie> {
    return {
        path: '/',
        sameSite: 'lax',
        domain: sharedCookieDomain,
        expires,
    };
}
