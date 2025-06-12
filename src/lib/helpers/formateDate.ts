type Props = {
	showTime?: boolean;
	timeOnly?: boolean;
	shortFormat?: boolean;
};

export function formatDate(dateInput: string | Date | null, options: Props = {}): string {
	if (!dateInput) return '';

	const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();

	const formattedDate = `${day}.${month}.${year}`;

	if (options.showTime && options.timeOnly) {
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		return `${hours}:${minutes}`;
	}

	if (options.showTime) {
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		return `${hours}:${minutes}, ${formattedDate}`;
	}

	if (options.shortFormat) {
		const shortYear = String(year).slice(-2);
		return `${day}/${month}/${shortYear}`;
	}

	return formattedDate;
}
