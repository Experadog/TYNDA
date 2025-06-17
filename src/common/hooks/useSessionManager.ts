'use client';

import { useRouter } from '@/i18n/routing';
import { decryptData } from '@/lib';
import type { Session, User } from '@business-entities';
import { useCallback, useEffect, useState } from 'react';

export function useSessionManager(initialSessionStr: string) {
	const router = useRouter();

	const [user, setUser] = useState<User | null>(
		() => decryptData<Session>(initialSessionStr)?.user ?? null,
	);

	const [isLoading, setIsLoading] = useState(false);

	const checkSession = useCallback(async () => {
		try {
			const res = await fetch('/api/session', {
				cache: 'no-store',
				priority: 'high',
			});
			const encrypted = await res.text();
			const shouldRefresh = decryptData<boolean>(encrypted);

			if (shouldRefresh) {
				setIsLoading(true);
				try {
					await fetch('/api/refresh', {
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
					}, 1000);

					router.refresh();
				}
			}
		} catch (error) {
			console.error('Ошибка проверки сессии:', error);
		}
	}, []);

	useEffect(() => {
		setUser(decryptData<Session>(initialSessionStr)?.user ?? null);
		if (!initialSessionStr) return;

		checkSession();

		const onFocus = () => checkSession();
		window.addEventListener('focus', onFocus);

		const intervalId = setInterval(checkSession, 60 * 1000);

		return () => {
			window.removeEventListener('focus', onFocus);
			clearInterval(intervalId);
		};
	}, [checkSession, initialSessionStr]);

	return {
		user,
		setUser,
		checkSession,
		isLoading,
	};
}
