'use server';

import { COOKIES, decryptData, defaultCookieConfig, encryptData } from '@/lib';
import type { EstablishmentDetailed, Session } from '@business-entities';
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
	cookieStore.delete(COOKIES.STAFF_ESTABLISHMENT);
	cookieStore.delete(COOKIES.LAST_PROFILE_RETRIEVAL);
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

export async function setStaffEstablishment(
	expires: string,
	payload?: EstablishmentDetailed | null,
) {
	if (!payload) return;

	const cookiesStore = await cookies();
	const encryptedData = encryptData(payload);

	cookiesStore.set(
		COOKIES.STAFF_ESTABLISHMENT,
		encryptedData,
		defaultCookieConfig(new Date(expires)),
	);
}

export async function getStaffEstablishment(): Promise<EstablishmentDetailed | null> {
	const cookieStore = await cookies();
	const cookieValue = cookieStore.get(COOKIES.STAFF_ESTABLISHMENT)?.value || '';
	if (!cookieValue) return null;
	return decryptData<EstablishmentDetailed>(cookieValue);
}

export async function clearStaffEstablishment() {
	const cookieStore = await cookies();
	cookieStore.delete(COOKIES.STAFF_ESTABLISHMENT);
}
