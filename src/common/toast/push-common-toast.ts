import toast from 'react-hot-toast';

export function pushCommonToast(text: string, status: 'success' | 'error') {
    if (status === 'success') {
        toast.success(text);
    } else if (status === 'error') {
        toast.error(text);
    }
}
