'use client';

import type { PageSettings } from '@common';
import { useEffect } from 'react';

export function usePageSettingsUseCase(settings: PageSettings) {
	const { fontSize, isGrayscale, isUnderlineLinks, borderRadius } = settings;

	useEffect(() => {
		if (isGrayscale) {
			document.body.classList.add('grayscale');
		} else {
			document.body.classList.remove('grayscale');
		}
	}, [isGrayscale]);

	useEffect(() => {
		const root = document.documentElement;

		root.classList.remove('font-size-small', 'font-size-medium', 'font-size-large');
		root.classList.add(`font-size-${fontSize}`);
	}, [fontSize]);

	useEffect(() => {
		const root = document.documentElement;

		if (isUnderlineLinks) {
			root.classList.add('links-underlined');
		} else {
			root.classList.remove('links-underlined');
		}
	}, [isUnderlineLinks]);

	useEffect(() => {
		document.documentElement.classList.remove(
			'rounded-none',
			'rounded-medium',
			'rounded-large',
		);
		document.documentElement.classList.add(`rounded-${borderRadius}`);
	}, [borderRadius]);

	return settings;
}
