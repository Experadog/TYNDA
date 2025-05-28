import { permanentRedirect, supportedLanguages } from '@/i18n/routing';
import { COOKIES, type PAGES } from '@/lib';
import { getCookie } from './get-cookie';

export async function forceRedirect(page: PAGES) {
	const locale = (await getCookie<Locale>(COOKIES.NEXT_LOCALE)) || supportedLanguages[0];
	return permanentRedirect({ href: page, locale });
}
