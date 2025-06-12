'use client';

import { REVALIDATE, URL_ENTITIES, URL_LOCAL_ENTITIES } from '@/lib';
import { UserRole } from '@business-entities';
import { useCacheRevalidateOnActivity } from '@common';
import { useEffect, useState } from 'react';
import { useUser } from '../user/user-provider';

const CacheRevalidate = () => {
	const { user } = useUser();

	const [shouldRevalidate, setShouldRevalidate] = useState(false);

	const prepareRevalidationTags = (): URL_ENTITIES[] => {
		const clientTags: URL_ENTITIES[] = [
			URL_ENTITIES.ESTABLISHMENT_ALL_CLIENT,
			URL_ENTITIES.TARIFF_CLIENT_ALL,
			URL_ENTITIES.CHAT_MY,
		];

		if (!user) return clientTags;

		const isAdmin = user.is_superuser;
		const isEstablisher = user.role === UserRole.ESTABLISHER;
		const isClient = user.role === UserRole.CLIENT && !isAdmin;

		if (isAdmin) {
			return [
				URL_ENTITIES.ESTABLISHMENT_ALL_ADMIN,
				URL_ENTITIES.USERS,
				URL_ENTITIES.CHAT_MY,
				URL_ENTITIES.TARIFF_ALL,
				URL_ENTITIES.CHAT,
			];
		}

		if (isEstablisher) {
			return [
				URL_ENTITIES.ESTABLISHMENT_ALL_ESTABLISHER,
				URL_ENTITIES.STAFF,
				URL_ENTITIES.CHAT,
			];
		}

		if (isClient) {
			return clientTags;
		}

		return [];
	};

	const checkRevalidation = async (): Promise<void> => {
		await fetch(`/api${URL_LOCAL_ENTITIES.REVALIDATE}`)
			.then((res) => res.json())
			.then((data) => {
				setShouldRevalidate(data.shouldRevalidate);
			})
			.catch(() => setShouldRevalidate(false));
	};

	useEffect(() => {
		checkRevalidation();
	}, []);

	useCacheRevalidateOnActivity({
		tags: prepareRevalidationTags(),
		revalidateOnVisibilityChange: true,
		revalidateOnUnfocus: true,
		revalidateIntervalMs: REVALIDATE.FIVE_MIN,
		revalidateOnLoad: true,
		enabled: shouldRevalidate,
	});

	return null;
};

export default CacheRevalidate;
