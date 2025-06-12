'use server';

import { COOKIES, encryptData } from '@/lib';
import { type PageSettings, getCookie, setCookie } from '@common';

const defaultSettings: PageSettings = {
	fontSize: 'medium',
	isGrayscale: false,
	isUnderlineLinks: false,
	borderRadius: 'medium',
};

export async function setDefaultSettings() {
	const encrypted = encryptData(defaultSettings);
	await setCookie(COOKIES.USER_SETTINGS, encrypted);
}

export async function getSettings() {
	const settings = await getCookie<PageSettings>(COOKIES.USER_SETTINGS, true);

	return settings || defaultSettings;
}

export async function switchGrayscale() {
	const settings = await getCookie<PageSettings>(COOKIES.USER_SETTINGS, true);

	const updatedSettings: PageSettings = {
		...defaultSettings,
		...settings,
		isGrayscale: !settings?.isGrayscale,
	};
	const encrypted = encryptData(updatedSettings);
	await setCookie(COOKIES.USER_SETTINGS, encrypted);
}

export async function switchUnderlineLinks() {
	const settings = await getCookie<PageSettings>(COOKIES.USER_SETTINGS, true);

	const updatedSettings: PageSettings = {
		...defaultSettings,
		...settings,
		isUnderlineLinks: !settings?.isUnderlineLinks,
	};
	const encrypted = encryptData(updatedSettings);
	await setCookie(COOKIES.USER_SETTINGS, encrypted);
}

export async function setBorderRadius(borderRadius: PageSettings['borderRadius']) {
	const settings = await getCookie<PageSettings>(COOKIES.USER_SETTINGS, true);

	const updatedSettings: PageSettings = {
		...defaultSettings,
		...settings,
		borderRadius,
	};
	const encrypted = encryptData(updatedSettings);
	await setCookie(COOKIES.USER_SETTINGS, encrypted);
}

export async function setFontSize(fontSize: PageSettings['fontSize']) {
	const settings = await getCookie<PageSettings>(COOKIES.USER_SETTINGS, true);

	const updatedSettings: PageSettings = {
		...defaultSettings,
		...settings,
		fontSize,
	};

	const encrypted = encryptData(updatedSettings);
	await setCookie(COOKIES.USER_SETTINGS, encrypted);
}
