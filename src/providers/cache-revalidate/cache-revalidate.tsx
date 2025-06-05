'use client';

import { REVALIDATE, URL_ENTITIES } from '@/lib';
import { UserRole } from '@business-entities';
import { useCacheRevalidateOnActivity } from '@common';
import { useUser } from '../user/user-provider';

const CacheRevalidate = () => {
	const { user } = useUser();

	const prepareRevalidationTags = (): URL_ENTITIES[] => {
		const clientTags: URL_ENTITIES[] = [URL_ENTITIES.ESTABLISHMENT_ALL_CLIENT];

		if (!user) return clientTags;

		const isAdmin = user.is_superuser;
		const isEstablisher = user.role === UserRole.ESTABLISHER;
		const isClient = user.role === UserRole.CLIENT && !isAdmin;

		if (isAdmin) {
			const adminTags: URL_ENTITIES[] = [
				URL_ENTITIES.ESTABLISHMENT_ALL_ADMIN,
				URL_ENTITIES.USERS,
				URL_ENTITIES.CHAT_MY,
			];

			return adminTags;
		}

		if (isEstablisher) {
			const establisherTags: URL_ENTITIES[] = [
				URL_ENTITIES.ESTABLISHMENT_ALL_ESTABLISHER,
				URL_ENTITIES.STAFF,
				URL_ENTITIES.ESTABLISHMENT_CHAT,
			];

			return establisherTags;
		}

		if (isClient) {
			return clientTags;
		}

		return [];
	};

	useCacheRevalidateOnActivity({
		tags: prepareRevalidationTags(),
		revalidateOnVisibilityChange: true,
		revalidateOnUnfocus: true,
		revalidateIntervalMs: REVALIDATE.FIVE_MIN,
		revalidateOnLoad: true,
	});

	return null;
};

export default CacheRevalidate;
