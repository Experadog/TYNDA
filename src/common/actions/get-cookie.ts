'use server';

import { COOKIES, decryptData } from '@/lib';
import { cookies } from 'next/headers';

export async function getCookie<T>(name: COOKIES, isEncrypted?: boolean) {
    const cookieStore = await cookies();
    const value = cookieStore.get(name)?.value || '';

    try {
        if (isEncrypted) {
            return decryptData(value) as T;
        } else {
            return JSON.parse(value) as T;
        }
    } catch (error) {
        return null;
    }
}
