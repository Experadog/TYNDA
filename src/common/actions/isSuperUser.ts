import { COOKIES } from '@/lib';
import { type Session, UserRole } from '@business-entities';
import { getCookie } from './get-cookie';

export async function isSuperUser() {
	const session = await getCookie<Session>(COOKIES.SESSION, true);
	return session?.user.is_superuser || false;
}

export async function isEstablishmentWorker() {
	const session = await getCookie<Session>(COOKIES.SESSION, true);
	return session?.user.role === UserRole.ESTABLISHMENT_WORKER || false;
}
