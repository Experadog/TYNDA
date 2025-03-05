import toast from 'react-hot-toast';
import { ActionMessages } from '../types/messages.types';

export function pushToast<T>(promise: Promise<{ data: T; code: number }>, options: ActionMessages) {
    return toast.promise(promise, {
        loading: options.loading,
        success: (res) => {
            if (res.code !== 200) {
                throw new Error(String(res.code));
            }
            return options.success;
        },
        error: (error) => {
            const statusCode = parseInt(error.message, 10);

            if (typeof options.error === 'string') {
                return options.error;
            }

            if (typeof options.error === 'object' && options.error !== null) {
                return options.error[statusCode] || `Ошибка: ${statusCode}`;
            }

            return 'Произошла неизвестная ошибка';
        },
    });
}
