'use client';

import { LOGGER, URL_ENTITIES, URL_LOCAL_ENTITIES } from '@/lib';
import { UserRole } from '@business-entities';
import { revalidateByTags } from '@common';
import { useEffect, useMemo, useState } from 'react';
import { useUser } from '../user/user-provider';

const CacheRevalidate = () => {
	const { user } = useUser();

	const [shouldRevalidate, setShouldRevalidate] = useState(false);

	const prepareRevalidationTags = useMemo((): URL_ENTITIES[] => {
		if (!user) return [URL_ENTITIES.ESTABLISHMENT_ALL_CLIENT];

		if (user.is_superuser) {
			return [
				URL_ENTITIES.ESTABLISHMENT_ALL_ADMIN,
				URL_ENTITIES.USERS,
				URL_ENTITIES.CHAT_MY,
				URL_ENTITIES.TARIFF_ALL,
				URL_ENTITIES.CHAT,
				URL_ENTITIES.CARD_ALL,
			];
		}

		if (user.role === UserRole.ESTABLISHER) {
			return [
				URL_ENTITIES.ESTABLISHMENT_ALL_ESTABLISHER,
				URL_ENTITIES.STAFF,
				URL_ENTITIES.CHAT,
			];
		}

		if (user.role === UserRole.CLIENT) {
			return [
				URL_ENTITIES.ESTABLISHMENT_ALL_CLIENT,
				URL_ENTITIES.TARIFF_CLIENT_ALL,
				URL_ENTITIES.CHAT_MY,
			];
		}

		return [];
	}, [user]);

	useEffect(() => {
		const checkRevalidation = async () => {
			try {
				const res = await fetch(`/api${URL_LOCAL_ENTITIES.REVALIDATE}`);
				const data = await res.json();
				setShouldRevalidate(data.shouldRevalidate);
			} catch {
				setShouldRevalidate(false);
			}
		};
		checkRevalidation();
	}, []);

	useEffect(() => {
		if (shouldRevalidate) {
			revalidateByTags(prepareRevalidationTags);
			LOGGER.warning(`Revalidating for: ${prepareRevalidationTags.join('; ')}`);
		}
	}, [shouldRevalidate]);

	return null;
};

export default CacheRevalidate;
