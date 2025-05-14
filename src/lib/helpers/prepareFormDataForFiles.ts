export function prepareFormDataForFiles(data: File[] | File): FormData {
	const formData = new FormData();

	if (Array.isArray(data)) {
		for (const file of data) {
			formData.append('files', file);
		}
	} else {
		formData.append('files', data);
	}

	return formData;
}
