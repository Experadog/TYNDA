'use server';

import { COOKIES, decryptData, defaultCookieConfig, encryptData } from '@/lib';
import type { Session } from '@business-entities';
import { cookies } from 'next/headers';

export async function getSession(): Promise<Session | null> {
	const cookieStore = await cookies();
	const cookieValue = cookieStore.get(COOKIES.SESSION)?.value || '';
	if (!cookieValue) return null;
	return decryptData<Session>(cookieValue);
}

export async function clearSession() {
	const cookieStore = await cookies();
	cookieStore.delete(COOKIES.SESSION);
}

export async function setSession(payload: Session) {
	const cookieStore = await cookies();
	const encrypted = encryptData(payload);
	cookieStore.set(
		COOKIES.SESSION,
		encrypted,
		defaultCookieConfig(new Date(payload.refresh_token_expire_time)),
	);
}
