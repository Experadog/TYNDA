import { COOKIES, REVALIDATE, encryptData } from '@/lib';
import { getCookie, setCookie } from '@common';
import { NextResponse } from 'next/server';

export async function GET() {
	const lastRevalidate = await getCookie<number>(COOKIES.LAST_REVALIDATE_KEY, true);
	const now = Date.now();

	let shouldRevalidate = false;

	if (!lastRevalidate) {
		shouldRevalidate = true;
	} else {
		const diff = now - lastRevalidate;
		if (diff >= REVALIDATE.FIVE_MIN) {
			shouldRevalidate = true;
		}
	}

	const response = NextResponse.json({ shouldRevalidate });

	if (shouldRevalidate) {
		const expires = new Date(now + REVALIDATE.FIVE_MIN);
		const encrypted = encryptData(now.toString());
		await setCookie(COOKIES.LAST_REVALIDATE_KEY, encrypted, expires);
	}

	return response;
}
