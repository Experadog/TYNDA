import { API_URL, URL_ENTITIES } from '@/lib';
import type { Credentials, Session } from '@business-entities';
import { type CommonResponse, clearSession, getSession, setSession } from '@common';

export async function POST() {
	const oldSession = await getSession();

	if (oldSession) {
		const payloadForRefresh = `access_token=${oldSession?.access_token}; refresh_token=${oldSession?.refresh_token}`;

		const headers = new Headers();
		headers.set('Cookie', payloadForRefresh);

		const res = await fetch(`${API_URL}${URL_ENTITIES.REFRESH_TOKEN}`, {
			method: 'POST',
			headers,
		});
		if (!res.ok) {
			await clearSession();
			return new Response('Failed to refresh tokens', { status: 401 });
		}

		const newCredentials = (await res.json()) as CommonResponse<Credentials>;

		const updatedSession: Session = {
			...newCredentials.data,
			last_refreshed_time: new Date().toISOString(),
			access_token_expire_time: new Date(Date.now() + 1 * 60 * 1000).toISOString(),
			user: oldSession?.user,
		};

		await setSession(updatedSession);
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	await clearSession();
	return new Response('No session found', { status: 401 });
}
