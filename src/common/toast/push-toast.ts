import toast from 'react-hot-toast';
import { ActionMessages } from '../types/messages.types';
import { CommonResponse } from '../types/responses.types';

export function pushToast<T>(
    promise: Promise<CommonResponse<T>>,
    options: ActionMessages,
): Promise<T> {
    return toast.promise(promise, {
        loading: options.loading,

        success: (res: CommonResponse<T>) => {
            if (res.code !== 200) {
                throw new Error(String(res.code));
            }
            return options.success;
        },
        error: (error: Error) => {
            const statusCode = parseInt(error.message, 10);

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
