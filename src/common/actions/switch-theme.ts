'use server';

import { COOKIES, sharedCookieDomain } from '@/lib';
import { cookies } from 'next/headers';

export async function switchTheme(theme: Theme) {
    const cookieStore = await cookies();

    cookieStore.set(COOKIES.THEME, theme, {
        domain: sharedCookieDomain,
        sameSite: 'lax',
        path: '/',
    });
}
