'use client';

import { LOGGER, URL_ENTITIES, URL_LOCAL_ENTITIES, decryptData } from '@/lib';
import { UserRole } from '@business-entities';
import { revalidateByTags } from '@common';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useUser } from '../user/user-provider';

type TagsMap = {
	guest: URL_ENTITIES[];
	[role: string]: URL_ENTITIES[];
};

const TAGS_BY_ROLE: TagsMap = {
	guest: [URL_ENTITIES.ESTABLISHMENT_ALL_CLIENT],
	superuser: [
		URL_ENTITIES.ESTABLISHMENT_ALL_ADMIN,
		URL_ENTITIES.USERS,
		URL_ENTITIES.CHAT_MY,
		URL_ENTITIES.TARIFF_ALL,
		URL_ENTITIES.CHAT,
		URL_ENTITIES.CARD_ALL,
	],
	establisher: [
		URL_ENTITIES.ESTABLISHMENT_ALL_ESTABLISHER,
		URL_ENTITIES.STAFF,
		URL_ENTITIES.CHAT,
	],
	client: [
		URL_ENTITIES.ESTABLISHMENT_ALL_CLIENT,
		URL_ENTITIES.TARIFF_CLIENT_ALL,
		URL_ENTITIES.CARD_HISTORY,
		URL_ENTITIES.CHAT_MY,
	],
};

const CacheRevalidate = () => {
	const { user } = useUser();

	const [shouldRevalidate, setShouldRevalidate] = useState(false);
	const hasRevalidated = useRef(false);

	const revalidationTags = useMemo(() => {
		const guestTags = TAGS_BY_ROLE.guest || [];

		if (!user) {
			return guestTags;
		}

		const roleTags: URL_ENTITIES[] = [];

		if (user.is_superuser) {
			roleTags.push(...TAGS_BY_ROLE.superuser);
		} else {
			switch (user.role) {
				case UserRole.ESTABLISHER:
					roleTags.push(...(TAGS_BY_ROLE.establisher || []));
					break;
				case UserRole.CLIENT:
					roleTags.push(...(TAGS_BY_ROLE.client || []));
					break;
				default:
					break;
			}
		}

		const combined = [...guestTags, ...roleTags];
		return Array.from(new Set(combined));
	}, [user]);

	useEffect(() => {
		let cancelled = false;

		const checkRevalidation = async () => {
			try {
				const res = await fetch(`/api${URL_LOCAL_ENTITIES.REVALIDATE}`);
				const data = await res.text();
				const decrypted = decryptData<{ shouldRevalidate: boolean }>(data);
				if (!cancelled) {
					setShouldRevalidate(decrypted?.shouldRevalidate ?? true);
				}
			} catch (err) {
				LOGGER.error(`CacheRevalidate: failed to check revalidation flag: ${err}`);
				if (!cancelled) {
					setShouldRevalidate(false);
				}
			}
		};

		checkRevalidation();

		return () => {
			cancelled = true;
		};
	}, []);

	useEffect(() => {
		if (shouldRevalidate && !hasRevalidated.current) {
			hasRevalidated.current = true;

			LOGGER.warning(`CacheRevalidate: Revalidating tags: ${revalidationTags.join('; ')}`);

			revalidateByTags(revalidationTags).catch((err) =>
				LOGGER.error(`CacheRevalidate: revalidateByTags failed: ${err}`),
			);
		}
	}, [shouldRevalidate, revalidationTags]);

	return null;
};

export default CacheRevalidate;
