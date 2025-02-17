import { locales } from '@/lib';
import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: locales,
    defaultLocale: 'ru',
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
