'use client';

import { DTOEmptyCommonResponse } from '@/dto/dtoEmpty';
import { isAxiosError } from 'axios';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { sendErrorToTelegram } from '../actions/sendUserErrorToTelegram';
import { pushCommonToast } from '../toast/push-common-toast';
import { pushToast } from '../toast/push-toast';
import type { ActionMessages } from '../types/messages.types';
import type { CommonResponse } from '../types/responses.types';

type AsyncAction<TResponse, TParams extends unknown[] = []> = (
	...args: TParams
) => Promise<TResponse>;

interface UseAsyncActionProps {
	messages?: ActionMessages;
	throttleTime?: number;
	returnDTO?: boolean;
	autoRequest?: boolean;
	onStart?: () => void;
	onDone?: () => void;
	isExternal?: boolean;
}

export function useAsyncAction<TResponse, TParams extends unknown[] = []>(
	props: UseAsyncActionProps,
) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [lastExecuted, setLastExecuted] = useState<number | null>(null);

	const {
		messages,
		throttleTime = 3000,
		returnDTO = true,
		autoRequest = false,
		isExternal = false,
		onStart,
		onDone,
	} = props;

	const lastActionRef = useRef<{
		action: AsyncAction<TResponse, TParams>;
		args: TParams;
	} | null>(null);

	const toastId = 'throttle-toast';

	const execute = async (
		action: AsyncAction<TResponse, TParams>,
		...args: TParams
	): Promise<TResponse | null> => {
		const now = Date.now();

		if (lastExecuted && now - lastExecuted < throttleTime) {
			const totalSeconds = Math.ceil(throttleTime / 1000);
			let countdown = totalSeconds;

			const messagePrefix = autoRequest ? 'Запрос будет выполнен через' : 'Повторите через';

			pushCommonToast(`${messagePrefix} ${countdown} с.`, 'loading', { id: toastId });

			const interval = setInterval(() => {
				countdown -= 1;
				if (countdown > 0) {
					pushCommonToast(`${messagePrefix} ${countdown} с.`, 'loading', { id: toastId });
				} else {
					clearInterval(interval);
					toast.dismiss(toastId);

					if (autoRequest) {
						lastActionRef.current = { action, args };

						const ref = lastActionRef.current;
						if (ref) {
							execute(ref.action, ...ref.args);
						}
					}
				}
			}, 1000);

			return returnDTO ? (DTOEmptyCommonResponse('Throttle timeout') as TResponse) : null;
		}

		lastActionRef.current = null;
		setIsLoading(true);
		onStart?.();
		setError(null);

		try {
			const resultPromise = action(...args);

			const response = messages
				? await pushToast(
						resultPromise as Promise<CommonResponse<TResponse>>,
						messages,
						isExternal,
					)
				: await resultPromise;

			setLastExecuted(Date.now());
			return response;
		} catch (err) {
			if (isAxiosError(err)) {
				const { code, message } = err;

				if (code === '401' && message === 'Token has expired') {
					await sendErrorToTelegram({ message, payload: args, stack: 'useAsyncAction' });
					pushCommonToast('Сессия истекла. Авторизуйтесь повторно', 'info');
					return returnDTO
						? (DTOEmptyCommonResponse('Session timeout') as TResponse)
						: null;
				}
			}

			setError(err as Error);
			throw err;
		} finally {
			setIsLoading(false);
			onDone?.(); // ⬅️ вызов onDone
		}
	};

	return { execute, isLoading, error };
}
