'use client';

import { LOGGER, type URL_ENTITIES } from '@/lib';
import { useCallback, useEffect, useRef } from 'react';
import { revalidateByTags } from '../actions/revalidateByTags';

type RevalidateTag = URL_ENTITIES[];

type UseCacheRevalidateOnActivityParams = {
	tags: RevalidateTag;
	revalidateOnUnfocus?: boolean;
	revalidateOnVisibilityChange?: boolean;
	revalidateIntervalMs?: number | null;
	revalidateOnLoad?: boolean;
};

export function useCacheRevalidateOnActivity({
	tags,
	revalidateOnUnfocus = false,
	revalidateOnVisibilityChange = false,
	revalidateIntervalMs = null,
	revalidateOnLoad = false,
}: UseCacheRevalidateOnActivityParams) {
	const lastRevalidationTime = useRef(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const hasRevalidatedOnLoad = useRef(false);

	const performRevalidation = useCallback(async () => {
		const now = Date.now();
		const minDelay = 10 * 1000;
		if (now - lastRevalidationTime.current < minDelay && lastRevalidationTime.current !== 0) {
			return;
		}

		try {
			await revalidateByTags(tags);
			lastRevalidationTime.current = now;
			LOGGER.warning(
				`Revalidating for togs: ${tags.join('; ')} – TIME: ${new Date(now).toLocaleTimeString()} `,
			);
		} catch (error) {
			console.error('Failed to revalidate cache:', error);
		}
	}, [tags]);

	useEffect(() => {
		if (revalidateOnLoad && !hasRevalidatedOnLoad.current) {
			performRevalidation();
			hasRevalidatedOnLoad.current = true;
		}
	}, [revalidateOnLoad, performRevalidation]);

	useEffect(() => {
		if (!revalidateOnUnfocus) return;

		const handleBlur = () => {
			performRevalidation();
		};

		window.addEventListener('blur', handleBlur);

		return () => {
			window.removeEventListener('blur', handleBlur);
		};
	}, [revalidateOnUnfocus, performRevalidation]);

	useEffect(() => {
		if (!revalidateOnVisibilityChange) return;

		const handleVisibilityChange = () => {
			if (document.visibilityState === 'visible') {
				performRevalidation();
			}
		};

		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	}, [revalidateOnVisibilityChange, performRevalidation]);

	useEffect(() => {
		if (revalidateIntervalMs === null || revalidateIntervalMs <= 0) {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
			return;
		}

		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}

		intervalRef.current = setInterval(() => {
			performRevalidation();
		}, revalidateIntervalMs);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, [revalidateIntervalMs, performRevalidation]);
}
