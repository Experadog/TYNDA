import { PAGES } from '../config/pages';

export function createDynamicCallbackUrl(locale: Locale) {
	return `https://www.tynda.kg/${locale}/auth${PAGES.CALLBACK}`;
}
