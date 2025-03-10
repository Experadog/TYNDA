'use server';

import { COOKIES } from '@/lib';
import { cookies } from 'next/headers';

export async function switchTheme(theme: Theme) {
    const cookieStore = await cookies();

    cookieStore.set(COOKIES.THEME, theme, {
        sameSite: 'lax',
        path: '/',
    });
}
