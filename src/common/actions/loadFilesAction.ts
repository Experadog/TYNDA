'use client';

import { LOGGER, prepareFormDataForFiles } from '@/lib';
import { type LoadFileResponseModel, loadFile } from '@/services';
import toast from 'react-hot-toast';
import { createAction } from './createAction';

type Props = {
	data: (File | string)[];
	messages: ViewModel['Toast']['LoadFile'];
	onFinish?: (res: LoadFileResponseModel) => Promise<void>;
};

export async function loadFilesAction({ data, messages, onFinish }: Props): Promise<string[]> {
	const filesToUpload: File[] = [];
	const existingUrls: string[] = [];
	const resultOrder: ('file' | 'url')[] = [];

	for (const item of data) {
		if (item instanceof File) {
			filesToUpload.push(item);
			resultOrder.push('file');
		} else if (typeof item === 'string') {
			existingUrls.push(item);
			resultOrder.push('url');
		}
	}

	if (filesToUpload.length === 0) {
		return existingUrls;
	}

	const formData = prepareFormDataForFiles(filesToUpload);

	const action = createAction({
		requestAction: loadFile,
		onSuccess: onFinish,
	});

	try {
		const uploadedUrls = await toast.promise(action(formData), {
			loading: messages.loading,
			success: messages.success,
			error: messages.error,
		});

		const result: string[] = [];
		let fileIndex = 0;
		let urlIndex = 0;

		for (const type of resultOrder) {
			if (type === 'file') {
				const url = Array.isArray(uploadedUrls.data)
					? uploadedUrls.data[fileIndex]
					: (uploadedUrls as unknown as { url?: string })?.url;

				result.push(url || '');
				fileIndex++;
			} else {
				result.push(existingUrls[urlIndex]);
				urlIndex++;
			}
		}

		return result;
	} catch (error) {
		LOGGER.error('Ошибка при загрузке файлов');
		const result: string[] = [];
		let urlIndex = 0;

		for (const type of resultOrder) {
			if (type !== 'file') {
				result.push(existingUrls[urlIndex]);
				urlIndex++;
			}
		}

		return result;
	}
}
