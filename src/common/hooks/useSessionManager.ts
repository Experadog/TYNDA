'use client';

import { useRouter } from '@/i18n/routing';
import { REVALIDATE, URL_LOCAL_ENTITIES, decryptData } from '@/lib';
import type { Session, User } from '@business-entities';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { pushCommonToast } from '../toast/push-common-toast';

function showThrottleToast(remainingTime: number) {
	let countdown = Math.ceil(remainingTime / 1000);
	const id = 'throttle-toast-unauthorized';

	pushCommonToast(`Сессия не действительная, выход через ${countdown} с.`, 'loading', {
		id,
	});

	const interval = setInterval(() => {
		countdown -= 1;

		if (countdown > 0) {
			pushCommonToast(`Сессия не действительная, выход через ${countdown} с.`, 'loading', {
				id,
			});
		} else {
			clearInterval(interval);
			toast.dismiss(id);
		}
	}, 1000);
}

export function useSessionManager(initialSessionStr: string) {
	const router = useRouter();

	const [user, setUser] = useState<User | null>(
		() => decryptData<Session>(initialSessionStr)?.user ?? null,
	);

	const [isLoading, setIsLoading] = useState(false);

	const checkSession = useCallback(async () => {
		try {
			const res = await fetch(`/api${URL_LOCAL_ENTITIES.SESSION}`, {
				cache: 'no-store',
				priority: 'high',
				method: 'GET',
				credentials: 'include',
			});
			const encrypted = await res.text();
			const shouldRefresh = decryptData<boolean>(encrypted);

			if (res.status === 401) {
				await fetch(`/api${URL_LOCAL_ENTITIES.CLEAR_SESSION}`, {
					method: 'DELETE',
				})
					.then(() => showThrottleToast(3000))
					.then(() =>
						setTimeout(() => {
							router.refresh();
						}, 3000),
					);

				return;
			}

			if (shouldRefresh && res.status === 200) {
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
			console.error('Ошибка проверки сессии: JAI', error);
			throw error;
		}
	}, []);

	useEffect(() => {
		setUser(decryptData<Session>(initialSessionStr)?.user ?? null);
		if (!initialSessionStr) return;

		const onFocus = () => checkSession();
		window.addEventListener('focus', onFocus);

		const intervalId = setInterval(checkSession, REVALIDATE.FIVE_MIN);

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
