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
	const lastRefreshed = useRef(decrypted?.last_refreshed);

	const isRefreshing = useRef(false);
	const refreshTimer = useRef<NodeJS.Timeout | null>(null);
	const isErrorHandled = useRef(false);
	const abortController = useRef<AbortController | null>(null);

	const isValidSession = !!access.current && !!refresh.current && !!expires.current;

	const clearRefreshTimer = useCallback(() => {
		if (refreshTimer.current) {
			clearTimeout(refreshTimer.current);
			refreshTimer.current = null;
		}
	}, []);

	const onError = useCallback(async () => {
		if (isErrorHandled.current) return;

		isErrorHandled.current = true;
		abortController.current?.abort();

		LOGGER.error('Error in session refreshing');

		await fetch(`${LOCAL_API_URL}${URL_LOCAL_ENTITIES.CLEAR_SESSION}`, {
			method: 'POST',
			credentials: 'include',
		}).then(() => {
			router.push('/auth/login');
			setUser(null);
			router.refresh();
		});
	}, [router, setUser]);

	const startRefreshTimer = useCallback(() => {
		if (!expires.current || !isValidSession || isRefreshing.current || isErrorHandled.current)
			return;

		const sessionExpireDate = new Date(expires.current);
		const now = new Date();
		const timeRemaining = sessionExpireDate.getTime() - now.getTime();

		if (timeRemaining <= 10000) {
			const refreshInterval = Math.max(timeRemaining - 10000, 0);
			clearRefreshTimer();
			refreshTimer.current = setTimeout(handleRefresh, refreshInterval);
		}
	}, [isValidSession, clearRefreshTimer]);

	const handleRefresh = useCallback(async () => {
		if (isRefreshing.current || !isValidSession || isErrorHandled.current) return;

		if (
			lastRefreshed.current &&
			new Date().getTime() - lastRefreshed.current < REFRESH_INTERVAL_GUARD
		) {
			return;
		}

		if (document.readyState !== 'complete') {
			await new Promise((resolve) =>
				window.addEventListener('load', resolve, { once: true }),
			);
		}

		if (document.visibilityState !== 'visible') {
			startRefreshTimer();
			return;
		}

		isRefreshing.current = true;
		clearRefreshTimer();
		abortController.current = new AbortController();

		try {
			LOGGER.info('Starting refreshing session...');
			const res = await fetch(`${LOCAL_API_URL}${URL_LOCAL_ENTITIES.REFRESH_SESSION}`, {
				method: 'POST',
				credentials: 'include',
				signal: abortController.current.signal,
				priority: 'high',
			});

			if (!res.ok) throw new Error('Failed to refresh token');

			const data = await res.json();
			const decryptedData = decryptData(data) as Session;

			// Testing
			const currentDateKey = new Date()
				.toLocaleString('ru-RU', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
				})
				.replace(/[\s,:]/g, '-');
			localStorage.setItem(currentDateKey, JSON.stringify(decryptedData.access_token));

			if (!decryptedData?.access_token) throw new Error('Invalid token');

			access.current = decryptedData.access_token;
			refresh.current = decryptedData.refresh_token;
			expires.current = decryptedData.access_token_expire_time;
			lastRefreshed.current = new Date().getTime();
			isErrorHandled.current = false;
			LOGGER.success('Session successfully refreshed');
		} catch (error) {
			await onError();
		} finally {
			router.refresh();
			isRefreshing.current = false;
		}
	}, [router, onError, startRefreshTimer, isValidSession, clearRefreshTimer]);

	useEffect(() => {
		if (isValidSession) {
			startRefreshTimer();

			const visibilityChangeHandler = () => {
				if (document.visibilityState === 'visible') {
					startRefreshTimer();
				} else {
					clearRefreshTimer();
				}
			};

			const focusHandler = () => startRefreshTimer();

			const resumeHandler = () => startRefreshTimer();

			document.addEventListener('visibilitychange', visibilityChangeHandler);
			window.addEventListener('focus', focusHandler);
			document.addEventListener('resume', resumeHandler);

			return () => {
				clearRefreshTimer();
				document.removeEventListener('visibilitychange', visibilityChangeHandler);
				window.removeEventListener('focus', focusHandler);
				document.removeEventListener('resume', resumeHandler);
				abortController.current?.abort();
			};
		}
	}, [isValidSession, startRefreshTimer, clearRefreshTimer]);

	useEffect(() => {
		isRefreshing.current = false;
	}, []);

	return <>{children}</>;
};

export default RefreshOnExpire;
