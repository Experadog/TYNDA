export function phoneFormatter(value?: string) {
	if (!value) return '';

	const clearValue = value.replace(/^tel:/, '');

	return format(clearValue);
}

export function format(value: string) {
	let digits = value.replace(/\D/g, '');

	if (digits.startsWith('996')) {
		digits = digits.slice(3);
	}

	if (digits.startsWith('0') && digits.length === 10) {
		digits = digits.slice(1);
	}

	let formatted = '+996';

	if (digits.length >= 3) {
		formatted += ` (${digits.substring(0, 3)}`;
	}
	if (digits.length >= 6) {
		formatted += `) ${digits.substring(3, 6)}`;
	}
	if (digits.length >= 9) {
		formatted += ` ${digits.substring(6, 9)}`;
	}

	return formatted.trim();
}
