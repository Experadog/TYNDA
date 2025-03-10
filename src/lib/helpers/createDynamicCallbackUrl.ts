import { ORIGIN } from '../config/oauth';
import { PAGES } from '../config/pages';

export function createDynamicCallbackUrl(locale: Locale) {
    return `${ORIGIN}/${locale}/auth${PAGES.CALLBACK}`;
}
