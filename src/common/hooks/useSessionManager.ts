'use client';

import { useRouter } from '@/i18n/routing';
import { REVALIDATE, URL_LOCAL_ENTITIES, decryptData } from '@/lib';
import type { Session, User } from '@business-entities';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export function useSessionManager(initialSessionStr: string) {
	const router = useRouter();

	const initialSession = useMemo(() => {
		try {
			return decryptData<Session>(initialSessionStr);
		} catch (err) {
			console.error('Ошибка при расшифровке сессии:', err);
			return null;
		}
	}, [initialSessionStr]);

	const [user, setUser] = useState<User | null>(() => initialSession?.user ?? null);
	const [isLoading, setIsLoading] = useState(false);

	const clearSession = useCallback(async () => {
		try {
			await fetch(`/api${URL_LOCAL_ENTITIES.CLEAR_SESSION}`, {
				method: 'DELETE',
			});
		} catch (error) {
			console.error('Ошибка очистки сессии:', error);
		} finally {
			setTimeout(() => {
				setIsLoading(false);
				router.refresh();
			}, 3000);
		}
	}, [router]);

	const checkSession = useCallback(
		async (forceCheck: boolean) => {
			try {
				if (forceCheck) {
					setIsLoading(true);
				}

				const url = new URL(`/api${URL_LOCAL_ENTITIES.SESSION}`, window.location.origin);
				if (forceCheck) {
					url.searchParams.set('force-check', 'true');
				}

				const res = await fetch(url, {
					cache: 'no-store',
					priority: 'high',
					method: 'GET',
					credentials: 'include',
				});

				if (res.status === 401) {
					await clearSession();
					return;
				}

				const encrypted = await res.text();
				const shouldRefresh = decryptData<boolean>(encrypted);

				if (res.status === 200 && shouldRefresh) {
					setIsLoading(true);
					try {
						await fetch(`/api${URL_LOCAL_ENTITIES.REFRESH}`, {
							cache: 'no-store',
							method: 'POST',
							credentials: 'include',
							priority: 'high',
						});
					} catch (error) {
						console.error('Ошибка обновления сессии:', error);
					} finally {
						setTimeout(() => {
							setIsLoading(false);
						}, 3000);

						router.refresh();
					}
				}
			} catch (error) {
				console.error('Ошибка проверки сессии:', error);
			} finally {
				setTimeout(() => {
					setIsLoading(false);
				}, 3000);
			}
		},
		[clearSession],
	);

	const lastClickTime = useRef<number | null>(null);
	const lastVisibilityCheckTime = useRef<number | null>(null);
	const intervalId = useRef<number | null>(null);

	useEffect(() => {
		if (!initialSession) return;

		const now = () => Date.now();
		const cooldown = REVALIDATE.ONE_MIN;

		const checkInterval = () => {
			if (document.visibilityState === 'visible') {
				if (intervalId.current === null) {
					intervalId.current = window.setInterval(() => {
						void checkSession(false);
					}, REVALIDATE.FIVE_MIN);
				}
			} else {
				if (intervalId.current !== null) {
					clearInterval(intervalId.current);
					intervalId.current = null;
				}
			}
		};

		const runVisibilityChangeCheck = () => {
			const elapsed = lastVisibilityCheckTime.current
				? now() - lastVisibilityCheckTime.current
				: Number.POSITIVE_INFINITY;

			if (elapsed >= cooldown) {
				lastVisibilityCheckTime.current = now();
				void checkSession(true);
			}
		};

		const runClickCheck = () => {
			const elapsed = lastClickTime.current
				? now() - lastClickTime.current
				: Number.POSITIVE_INFINITY;

			if (elapsed >= cooldown) {
				lastClickTime.current = now();
				void checkSession(false);
			}
		};

		const handleVisibilityChange = () => {
			if (document.visibilityState === 'visible') {
				runVisibilityChangeCheck();
			}
			checkInterval();
		};

		const handleClick = () => {
			runClickCheck();
		};

		document.addEventListener('visibilitychange', handleVisibilityChange);
		document.addEventListener('click', handleClick);

		checkInterval();

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange);
			document.removeEventListener('click', handleClick);
			if (intervalId.current !== null) clearInterval(intervalId.current);
		};
	}, [checkSession, initialSession]);

	return {
		user,
		setUser,
		checkSession,
		isLoading,
	};
}
