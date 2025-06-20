'use client';

import { LOGGER, checkFormDataSize, prepareFormDataForFiles } from '@/lib';
import { loadFile } from '@/services';
import toast from 'react-hot-toast';
import { pushCommonToast } from '../toast/push-common-toast';
import { createAction } from './createAction';

type Props = {
	data: (File | string)[];

	validationMessage: string;
	toastMessage: ViewModel['Toast']['LoadFile'];
};

export async function loadFilesAction({
	data,
	toastMessage,
	validationMessage,
}: Props): Promise<string[]> {
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

	const isAvailableSize = checkFormDataSize(formData, 10);

	if (!isAvailableSize) {
		pushCommonToast(validationMessage, 'error');
		return [];
	}

	const action = createAction({
		requestAction: loadFile,
	});

	try {
		const uploadedUrls = await toast.promise(action(formData), toastMessage);

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
