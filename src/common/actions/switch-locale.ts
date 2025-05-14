'use server';

import { COOKIES, defaultCookieConfig } from '@/lib';
import { cookies } from 'next/headers';

export async function switchLocale(locale: Locale) {
	const cookieStore = await cookies();

	cookieStore.set(COOKIES.NEXT_LOCALE, locale, defaultCookieConfig());
}
