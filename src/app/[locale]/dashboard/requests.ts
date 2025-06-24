'use server';

import { PAGES, PAGINATION } from '@/lib';
import {
	getAdminTariffList,
	getCardList,
	getEstablishmentAllAdmin,
	getEstablishmentAllEstablisher,
	getRoles,
	getUserChatList,
	getUsers,
} from '@/services';
import { UserRole } from '@business-entities';
import {
	type CommonData,
	type EstablisherData,
	type RoleResult,
	type SuperUserData,
	forceRedirect,
	getSession,
} from '@common';

import { getSettings } from './settings';

async function getEstablisherData(): Promise<Omit<EstablisherData, keyof CommonData>> {
	const [establishmentsResponse, rolesResponse, chatResponse] = await Promise.all([
		getEstablishmentAllEstablisher(PAGINATION.establishment),
		getRoles(PAGINATION.role),
		getUserChatList(PAGINATION.chat),
	]);

	return { rolesResponse, chatResponse, establishmentsResponse };
}

async function getSuperUserData(): Promise<Omit<SuperUserData, keyof CommonData>> {
	const [
		establishmentsResponse,
		rolesResponse,
		allUsersResponse,
		chatResponse,
		tariffResponse,
		cardResponse,
		establisherOnlyResponse,
	] = await Promise.all([
		getEstablishmentAllAdmin(PAGINATION.establishment),
		getRoles(PAGINATION.role),
		getUsers(PAGINATION.user),
		getUserChatList(PAGINATION.chat),
		getAdminTariffList(PAGINATION.tariff),
		getCardList(PAGINATION.card),
		getUsers({ ...PAGINATION.user, role: UserRole.ESTABLISHER }),
	]);

	return {
		rolesResponse,
		allUsersResponse,
		chatResponse,
		tariffResponse,
		cardResponse,
		establisherOnlyResponse,
		establishmentsResponse,
	};
}

export async function executeRoleRequests(): Promise<RoleResult> {
	const session = await getSession();

	if (!session) return forceRedirect(PAGES.LOGIN);

	const { role, is_superuser } = session.user;

	const settingsData = await getSettings();

	const common: CommonData = {
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

	if (role === UserRole.ESTABLISHMENT_WORKER) {
		return { roleType: 'establishment_worker', data: { ...common } };
	}

	return forceRedirect(PAGES.LOGIN);
}
