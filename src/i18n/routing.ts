import { COOKIES } from '@/lib';
import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const supportedLanguages = ['ru', 'kg', 'en'] as const;
export type SupportedLanguages = (typeof supportedLanguages)[number];

export const routing = defineRouting({
	locales: supportedLanguages,
	defaultLocale: 'ru',
	localeCookie: {
		sameSite: 'lax',
		path: '/',
		name: COOKIES.NEXT_LOCALE,
		maxAge: undefined,
	},
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
