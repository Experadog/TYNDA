export function priceFormatter(value: string | number, postfix?: string) {
	if (value == null) return '';

	const numberValue = typeof value === 'number' ? value : Number(value);

	if (Number.isNaN(numberValue)) return String(value);

	const formatted = numberValue.toLocaleString('ru-RU').replace(/,/g, ' ');

	return postfix ? `${formatted} ${postfix}` : formatted;
}
