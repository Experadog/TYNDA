'use client';

import { useRouter } from '@/i18n/routing';
import {
	LOCAL_API_URL,
	LOGGER,
	REFRESH_INTERVAL_GUARD,
	URL_LOCAL_ENTITIES,
	decryptData,
} from '@/lib';
import type { Session } from '@business-entities';
import { type FC, type ReactNode, useCallback, useEffect, useRef } from 'react';
import { useUser } from '../user/user-provider';

interface IProps {
	children: ReactNode;
	initialSession: string;
}

const RefreshOnExpire: FC<IProps> = ({ children, initialSession }) => {
	const { setUser } = useUser();
	const decrypted = decryptData(initialSession) as Session | null;
	const router = useRouter();

	const access = useRef(decrypted?.access_token);
	const refresh = useRef(decrypted?.refresh_token);
	const expires = useRef(decrypted?.access_token_expire_time);
	const lastRefreshed = useRef(decrypted?.last_refreshed ?? 0);

	const isRefreshing = useRef(false);
	const refreshTimer = useRef<NodeJS.Timeout | null>(null);
	const isErrorHandled = useRef(false);
	const abortController = useRef<AbortController | null>(null);

	const isValidSession = !!access.current && !!refresh.current && !!expires.current;

	const clearTimers = useCallback(() => {
		if (refreshTimer.current) {
			clearTimeout(refreshTimer.current);
			refreshTimer.current = null;
		}
	}, []);

	const onError = useCallback(async () => {
		if (isErrorHandled.current) return;
		isErrorHandled.current = true;
		abortController.current?.abort();

		LOGGER.error('Session refresh failed');

		await fetch(`${LOCAL_API_URL}${URL_LOCAL_ENTITIES.CLEAR_SESSION}`, {
			method: 'POST',
			credentials: 'include',
		}).then(() => {
			router.push('/auth/login');
			setUser(null);
			router.refresh();
		});
	}, [router, setUser]);

	const handleRefresh = useCallback(async () => {
		if (isRefreshing.current || !isValidSession || isErrorHandled.current) return;

		const now = Date.now();

		if (lastRefreshed.current && now - lastRefreshed.current < REFRESH_INTERVAL_GUARD) {
			return;
		}

		isRefreshing.current = true;
		clearTimers();
		abortController.current = new AbortController();

		try {
			LOGGER.info('Refreshing session...');

			const res = await fetch(`${LOCAL_API_URL}${URL_LOCAL_ENTITIES.REFRESH_SESSION}`, {
				method: 'POST',
				credentials: 'include',
				signal: abortController.current.signal,
				priority: 'high',
			});

			if (!res.ok) {
				const text = await res.text();
				LOGGER.error(`Failed to refresh token: ${res.status} - ${text}`);
				throw new Error('Failed to refresh token');
			}

			const encryptedData = await res.text();
			const decryptedData = decryptData(encryptedData) as Session;

			if (!decryptedData?.access_token) throw new Error('Invalid token');

			access.current = decryptedData.access_token;
			refresh.current = decryptedData.refresh_token;
			expires.current = decryptedData.access_token_expire_time;

			lastRefreshed.current = now;
			isErrorHandled.current = false;

			LOGGER.success('Session successfully refreshed');
		} catch (err) {
			await onError();
		} finally {
			isRefreshing.current = false;
			router.refresh();
			scheduleRefresh();
		}
	}, [isValidSession, onError, router, clearTimers]);

	const scheduleRefresh = useCallback(() => {
		if (!isValidSession || isRefreshing.current || isErrorHandled.current || !expires.current)
			return;

		clearTimers();

		const now = Date.now();
		const expireAt = new Date(expires.current).getTime();
		const remainingMs = expireAt - now;

		const refreshIn = Math.max(remainingMs - 300_00, 0);

		refreshTimer.current = setTimeout(() => {
			LOGGER.info(`⏳ Refresh triggered at ${new Date().toLocaleTimeString()}`);
			handleRefresh();
		}, refreshIn);
	}, [isValidSession, handleRefresh, clearTimers, expires, isErrorHandled]);

	useEffect(() => {
		if (!isValidSession) return;

		scheduleRefresh();

		const handleVisibility = () => {
			if (document.visibilityState === 'visible') {
				scheduleRefresh();
			} else {
				clearTimers();
			}
		};

		const handleFocus = () => scheduleRefresh();

		document.addEventListener('visibilitychange', handleVisibility);
		window.addEventListener('focus', handleFocus);

		return () => {
			clearTimers();
			document.removeEventListener('visibilitychange', handleVisibility);
			window.removeEventListener('focus', handleFocus);
			abortController.current?.abort();
		};
	}, [isValidSession, scheduleRefresh, clearTimers]);

	useEffect(() => {
		isRefreshing.current = false;
	}, []);

	return <>{children}</>;
};

export default RefreshOnExpire;
