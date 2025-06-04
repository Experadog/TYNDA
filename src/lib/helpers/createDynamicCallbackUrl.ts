import { PAGES } from '../config/pages';

export function createDynamicCallbackUrl(locale: Locale) {
	return `www.tynda.kg/${locale}/auth${PAGES.CALLBACK}`;
}
