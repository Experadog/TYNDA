import {
	COOKIES,
	REFRESH_INTERVAL_GUARD,
	URL_ENTITIES,
	decryptData,
	defaultCookieConfig,
	encryptData,
	parseISOStringToDate,
} from '@/lib';
import type { Credentials, Session } from '@business-entities';
import { AXIOS_POST, type CommonResponse } from '@common';
import { cookies } from 'next/headers';

export async function POST() {
	const cookieStore = await cookies();
	const oldSession = cookieStore.get(COOKIES.SESSION)?.value;

	const decryptedOldSession = decryptData(oldSession || '') as Session | null;

	if (!decryptedOldSession) {
		return new Response(encryptData({ code: 401 }), { status: 200 });
	}

	if (
		decryptedOldSession?.last_refreshed &&
		Date.now() - decryptedOldSession.last_refreshed < REFRESH_INTERVAL_GUARD
	) {
		return new Response(oldSession, {
			status: 200,
		});
	}

	const res = await AXIOS_POST<CommonResponse<Credentials>>({ url: URL_ENTITIES.REFRESH_TOKEN });

	console.log('From api: ', res);

	if (res.code !== 200) {
		return new Response(encryptData({ code: 200 }), { status: 200 });
	}

	const data = res?.data;

	const newSession: Session = {
		...decryptedOldSession,
		...data,
		last_refreshed: Date.now(),
	};

	const encryptedNewSession = encryptData(newSession);

	cookieStore.set(
		COOKIES.SESSION,
		encryptedNewSession,
		defaultCookieConfig(parseISOStringToDate(newSession.refresh_token_expire_time)),
	);

	const response = new Response(encryptedNewSession, {
		status: 200,
	});

	return response;
}
