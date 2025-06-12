import toast, { type ToastOptions } from 'react-hot-toast';

export function pushCommonToast(
	text: string,
	status: 'success' | 'error' | 'info' | 'loading',
	opts?: ToastOptions,
) {
	if (status === 'success') {
		toast.success(text, opts);
	} else if (status === 'error') {
		toast.error(text, opts);
	} else if (status === 'info') {
		toast(text, opts);
	} else if (status === 'loading') {
		toast.loading(text, opts);
	}
}
