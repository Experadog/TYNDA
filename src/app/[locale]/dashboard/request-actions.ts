'use server';

import { COOKIES, PAGES, PAGINATION } from '@/lib';
import {
	type GetEstablishmentAllClientResponseModel,
	type GetRolesResponseModel,
	type UsersRetrievalResponseModel,
	getEstablishmentAll,
	getRoles,
	getUsers,
} from '@/services';
import { type Session, UserRole } from '@business-entities';
import { forceRedirect, getCookie } from '@common';

type Exposes = {
	establishmentsResponse?: GetEstablishmentAllClientResponseModel;
	rolesResponse?: GetRolesResponseModel;
	usersResponse?: UsersRetrievalResponseModel;
};

async function getCommonData(): Promise<Exposes> {
	const establishmentsResponse = await getEstablishmentAll(PAGINATION.establishment);
	return { establishmentsResponse };
}

async function getEstablisherData(): Promise<Exposes> {
	const rolesResponse = await getRoles(PAGINATION.role);
	return { rolesResponse };
}

async function getSuperUserData(): Promise<Pick<Exposes, 'rolesResponse' | 'usersResponse'>> {
	const [rolesResponse, usersResponse] = await Promise.all([
		getRoles(PAGINATION.role),
		getUsers(PAGINATION.user),
	]);

	return { rolesResponse, usersResponse };
}

export async function executeDefaultRoleRequests(): Promise<Exposes> {
	const session = await getCookie<Session>(COOKIES.SESSION, true);
	if (!session) return forceRedirect(PAGES.LOGIN);

	const { role, is_superuser } = session.user;

	const common = await getCommonData();

	const establisher = role === UserRole.ESTABLISHER ? await getEstablisherData() : {};

	const superUser = is_superuser ? await getSuperUserData() : {};

	return {
		...common,
		...establisher,
		...superUser,
	};
}
