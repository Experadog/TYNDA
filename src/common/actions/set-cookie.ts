'use server';
import { cookies } from 'next/headers';

export async function setCookie(
    cookieName: string,
    cookieValue: string,
    expires: Date,
) {
    const cookieStore = await cookies();
    cookieStore.set(cookieName, cookieValue, {
        sameSite: 'lax',
        path: '/',
        expires,
    });
}
