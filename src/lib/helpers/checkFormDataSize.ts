export function checkFormDataSize(formData: FormData, maxSizeMB: number): boolean {
	const maxSizeBytes = maxSizeMB * 1024 * 1024;
	let totalSize = 0;

	for (const value of formData.values()) {
		if (value instanceof File) {
			totalSize += value.size;
		}
	}

	return totalSize <= maxSizeBytes;
}
