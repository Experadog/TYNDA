import toast from 'react-hot-toast';

export function pushToast<T>(
    promise: Promise<{ data: T; code: number }>,
    options: {
        loading: string;
        success: string;
        error: { [key: number]: string };
    }
) {
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
            return options.error[statusCode] || `Ошибка: ${statusCode}`;
        },
    });
}
