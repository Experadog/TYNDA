export function phoneFormatter(value?: string) {
	if (!value) return '';

	const clearValue = value.replace(/^tel:/, '');

	return format(clearValue);
}

export function format(value: string) {
	let digits = value.replace(/\D/g, '');

	let formatted = '+996 ';

	if (digits.startsWith('996')) {
		digits = digits.slice(3);
	}

	if (digits.length > 0) {
		formatted += `(${digits.substring(0, 3)}`;
	}
	if (digits.length >= 4) {
		formatted += `) ${digits.substring(3, 6)}`;
	}
	if (digits.length >= 7) {
		formatted += ` ${digits.substring(6, 9)}`;
	}

	return formatted.trim();
}
