'use server';

import { COOKIES, PAGES, PAGINATION } from '@/lib';
import {
	getAdminTariffList,
	getCardList,
	getEstablishmentAll,
	getRoles,
	getUserChatList,
	getUsers,
} from '@/services';
import { type Session, UserRole } from '@business-entities';
import {
	type CommonData,
	type EstablisherData,
	type RoleResult,
	type SuperUserData,
	forceRedirect,
	getCookie,
} from '@common';

import { getSettings } from './settings';

async function getCommonData(): Promise<Omit<CommonData, 'settingsData'>> {
	const establishmentsResponse = await getEstablishmentAll(PAGINATION.establishment);
	return { establishmentsResponse };
}

async function getEstablisherData(): Promise<Omit<EstablisherData, keyof CommonData>> {
	const [rolesResponse, chatResponse] = await Promise.all([
		getRoles(PAGINATION.role),
		getUserChatList(PAGINATION.chat),
	]);

	return { rolesResponse, chatResponse };
}

async function getSuperUserData(): Promise<Omit<SuperUserData, keyof CommonData>> {
	const [rolesResponse, usersResponse, chatResponse, tariffResponse, cardResponse] =
		await Promise.all([
			getRoles(PAGINATION.role),
			getUsers(PAGINATION.user),
			getUserChatList(PAGINATION.chat),
			getAdminTariffList(PAGINATION.tariff),
			getCardList(PAGINATION.card),
		]);

	return { rolesResponse, usersResponse, chatResponse, tariffResponse, cardResponse };
}

export async function executeRoleRequests(): Promise<RoleResult> {
	const session = await getCookie<Session>(COOKIES.SESSION, true);

	if (!session) return forceRedirect(PAGES.LOGIN);

	const { role, is_superuser } = session.user;

	const commonWithoutSettings = await getCommonData();
	const settingsData = await getSettings();

	const common: CommonData = {
		...commonWithoutSettings,
		settingsData,
	};

	if (is_superuser) {
		const superUser = await getSuperUserData();
		return { roleType: 'superadmin', data: { ...common, ...superUser } };
	}

	if (role === UserRole.ESTABLISHER) {
		const establisher = await getEstablisherData();
		return { roleType: 'establisher', data: { ...common, ...establisher } };
	}

	if (role === UserRole.ESTABLISHER_WORKER) {
		return { roleType: 'establisher_worker', data: common };
	}

	return forceRedirect(PAGES.LOGIN);
}
