'use server';

import type { COOKIES } from '@/lib';
import { cookies } from 'next/headers';

export async function clearCookie(name: COOKIES) {
	const cookieStore = await cookies();
	cookieStore.delete(name);
}
