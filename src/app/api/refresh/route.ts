import { API_URL, REVALIDATE, URL_ENTITIES, encryptData } from '@/lib';
import type { Credentials, Session } from '@business-entities';
import {
	type CommonResponse,
	clearSession,
	getSession,
	sendErrorToTelegram,
	setSession,
} from '@common';

export async function POST() {
	const oldSession = await getSession();
	const response = encryptData({ success: true });
	const successStatus = { status: 200 };

	if (oldSession) {
		const now = Date.now();

		const lastRefreshed = oldSession.last_refreshed_time
			? Date.parse(oldSession.last_refreshed_time)
			: null;

		if (lastRefreshed && now - lastRefreshed < REVALIDATE.ONE_MIN) {
			return new Response(response, successStatus);
		}

		const payloadForRefresh = `access_token=${oldSession?.access_token}; refresh_token=${oldSession?.refresh_token}`;

		const headers = new Headers();
		headers.set('Cookie', payloadForRefresh);

		const res = await fetch(`${API_URL}${URL_ENTITIES.REFRESH_TOKEN}`, {
			method: 'POST',
			headers,
		});

		if (!res.ok) {
			await clearSession();
			await sendErrorToTelegram({
				message: `Error in session updating, message: '${res.statusText}(${res.status}) - POST`,
				payload: `params: ${payloadForRefresh}`,
			});
			return new Response(response, successStatus);
		}

		const newCredentials = (await res.json()) as CommonResponse<Credentials>;

		const updatedSession: Session = {
			...newCredentials.data,
			last_refreshed_time: new Date().toISOString(),
			user: oldSession?.user,
		};

		await setSession(updatedSession);
		return new Response(response, {
			status: 200,
		});
	}

	await clearSession();
	return new Response(response, successStatus);
}
