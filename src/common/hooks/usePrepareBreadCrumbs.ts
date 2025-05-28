import { useViewModel } from '@/i18n/getTranslate';
import { PAGES } from '@/lib';
import { useMemo } from 'react';
import type { Crumb } from '../types/shared.types';

type Props = {
	pathname: string;
	startIndex?: number;
	customHomePath?: PAGES;
	dynamicLabels?: Record<string, string>;
};

function normalizePath(path: string): string {
	return path
		.replace(/\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, '/[id]')
		.replace(/\/\d+/g, '/[id]');
}

export function usePrepareBreadCrumbs({
	pathname,
	startIndex = 0,
	customHomePath = PAGES.HOME,
	dynamicLabels = {},
}: Props) {
	const { breadCrumbs } = useViewModel(['Shared']);

	const result = useMemo(() => {
		const parts = pathname.split('/').filter(Boolean);

		let accumulatedPath = '';
		const crumbs: Crumb[] = [];

		for (const part of parts) {
			accumulatedPath += `/${part}`;

			const matchedEntry =
				Object.entries(PAGES).find(
					([, value]) => normalizePath(value) === normalizePath(accumulatedPath),
				) ??
				Object.entries(PAGES).find(([, value]) => {
					const segments = value.split('/').filter(Boolean);
					return segments.at(-1) === part;
				});

			const key = matchedEntry?.[0] as keyof typeof breadCrumbs;

			let label = '';
			if (key && breadCrumbs[key]) {
				label = breadCrumbs[key];
			} else if (dynamicLabels[part]) {
				label = dynamicLabels[part];
			} else {
				label = decodeURIComponent(part).replace(/-/g, ' ');
				label = label.charAt(0).toUpperCase() + label.slice(1);
			}

			crumbs.push({ href: accumulatedPath, label });
		}

		const homeSegment = customHomePath.split('/').filter(Boolean).at(-1);
		const home: Crumb = {
			href: customHomePath,
			label:
				(homeSegment &&
					breadCrumbs[homeSegment.toUpperCase() as keyof typeof breadCrumbs]) ??
				customHomePath,
		};

		return { home, paths: crumbs.slice(startIndex) };
	}, [breadCrumbs, dynamicLabels, startIndex, customHomePath, pathname]);

	return result;
}
