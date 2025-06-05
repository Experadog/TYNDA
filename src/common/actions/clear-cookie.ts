'use server';

import type { COOKIES } from '@/lib';
import { cookies } from 'next/headers';

export async function clearCookie(name: COOKIES) {
	try {
		const cookieStore = await cookies();
		cookieStore.delete(name);
	} catch (err) {
		console.error('Failed to clear cookie', err);
	}
}
