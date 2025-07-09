import { isEmptyObject } from '@/lib';
import toast from 'react-hot-toast';
import type { ActionMessages } from '../types/messages.types';
import type { CommonResponse } from '../types/responses.types';

export function pushToast<T>(
	promise: Promise<CommonResponse<T>>,
	options: ActionMessages,
	isExternal?: boolean,
): Promise<T> {
	return toast.promise(promise, {
		loading: options.loading,

		success: (res: CommonResponse<T>) => {
			if (isExternal && !isEmptyObject(res)) return options.success;

			if (res.code !== 200) {
				throw new Error(String(res.code));
			}
			return options.success;
		},

		error: (error: Error) => {
			const statusCode = Number.parseInt(error.message, 10);

			if (statusCode === 500) {
				return 'Ошибка сервера, повторите попытку позже';
			}

			if (typeof options.error === 'string') {
				return options.error;
			}

			if (typeof options.error === 'object' && options.error !== null) {
				return options.error[statusCode] || `Неизвестная ошибка: ${statusCode}`;
			}

			return 'Произошла неизвестная ошибка';
		},
	}) as Promise<T>;
}
