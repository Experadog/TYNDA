'use server';

import { COOKIES } from '@/lib';
import { cookies } from 'next/headers';

export async function switchTheme(theme: Theme) {
    const cookieStore = await cookies();

    console.log(theme);

    cookieStore.set(COOKIES.THEME, theme, {
        domain: '.example.local',
        sameSite: 'lax',
        path: '/',
    });
}
