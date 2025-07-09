// 'use client';

// import { LOGGER, URL_ENTITIES, URL_LOCAL_ENTITIES, decryptData } from '@/lib';
// import { UserRole } from '@business-entities';
// import { revalidateByTags } from '@common';
// import { useEffect, useMemo, useRef, useState } from 'react';
// import { useUser } from '../user/user-provider';

// const TAGS_BY_ROLE = {
// 	guest: [URL_ENTITIES.ESTABLISHMENT_ALL_CLIENT, URL_ENTITIES.ESTABLISHMENT_ALL_MAP],
// 	superuser: [
// 		URL_ENTITIES.ESTABLISHMENT_ALL_ADMIN,
// 		URL_ENTITIES.USERS,
// 		URL_ENTITIES.CHAT_MY,
// 		URL_ENTITIES.TARIFF_ALL,
// 		URL_ENTITIES.CHAT,
// 		URL_ENTITIES.CARD_ALL,
// 	],
// 	establisher: [
// 		URL_ENTITIES.ESTABLISHMENT_ALL_ESTABLISHER,
// 		URL_ENTITIES.STAFF,
// 		URL_ENTITIES.CHAT,
// 	],
// 	client: [
// 		URL_ENTITIES.ESTABLISHMENT_ALL_CLIENT,
// 		URL_ENTITIES.TARIFF_CLIENT_ALL,
// 		URL_ENTITIES.CARD_HISTORY,
// 		URL_ENTITIES.CHAT_MY,
// 	],
// } as const;

// export default function CacheRevalidate() {
// 	const { user } = useUser();
// 	const [shouldRevalidate, setShouldRevalidate] = useState(false);
// 	const hasRevalidated = useRef(false);
// 	const isMounted = useRef(false);

// 	const revalidationTags = useMemo(() => {
// 		const tags = new Set(TAGS_BY_ROLE.guest);

// 		if (!user) return Array.from(tags);

// 		if (user.is_superuser) {
// 			TAGS_BY_ROLE.superuser.forEach((tag) => tags.add(tag));
// 		} else {
// 			switch (user.role) {
// 				case UserRole.ESTABLISHER:
// 					TAGS_BY_ROLE.establisher.forEach((tag) => tags.add(tag));
// 					break;
// 				case UserRole.CLIENT:
// 					TAGS_BY_ROLE.client.forEach((tag) => tags.add(tag));
// 					break;
// 			}
// 		}

// 		return Array.from(tags);
// 	}, [user]);

// 	// Check once on mount
// 	useEffect(() => {
// 		if (isMounted.current) return;
// 		isMounted.current = true;

// 		let cancelled = false;

// 		const checkFlag = async () => {
// 			try {
// 				const res = await fetch(`/api${URL_LOCAL_ENTITIES.REVALIDATE}`);
// 				const data = await res.text();
// 				const decrypted = decryptData<{ shouldRevalidate: boolean }>(data);
// 				const flag = decrypted?.shouldRevalidate ?? false;

// 				if (!cancelled && flag) {
// 					setShouldRevalidate(true);
// 				}
// 			} catch (err) {
// 				LOGGER.error(`CacheRevalidate (initial): ${err}`);
// 			}
// 		};

// 		checkFlag();
// 		return () => {
// 			cancelled = true;
// 		};
// 	}, []);

// 	// Trigger revalidation once
// 	useEffect(() => {
// 		if (!shouldRevalidate || hasRevalidated.current) return;

// 		hasRevalidated.current = true;
// 		LOGGER.warning(`🔁 Revalidating tags: ${revalidationTags.join(', ')}`);

// 		const revalidate = async (retries = 3) => {
// 			try {
// 				await revalidateByTags(revalidationTags);
// 				LOGGER.success('✅ Tags successfully revalidated.');
// 			} catch (err) {
// 				LOGGER.error(`❌ Revalidate attempt failed: ${err}`);

// 				if (retries > 0) {
// 					LOGGER.info(`🔁 Retrying (${retries})...`);
// 					setTimeout(() => revalidate(retries - 1), 1000);
// 				}
// 			} finally {
// 				setShouldRevalidate(false);
// 			}
// 		};

// 		revalidate();
// 	}, [shouldRevalidate, revalidationTags]);

// 	return null;
// }
