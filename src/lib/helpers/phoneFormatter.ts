export function phoneFormatter(value?: string) {
    if (!value) return '';

    return value.replace(/^tel:/, '');
}
