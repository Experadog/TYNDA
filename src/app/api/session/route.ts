import { API_URL, COOKIES, REVALIDATE, URL_ENTITIES, encryptData } from '@/lib';
import { getCookie, getSession, setCookie } from '@common';

export async function GET(request: Request) {
	const session = await getSession();

	const url = new URL(request.url);
	const forceCheck = url.searchParams.get('force-check') === 'true';

	let shouldValidate = false;
	const now = Date.now();

	if (session) {
		const lastRefreshed = session.last_refreshed_time
			? Date.parse(session.last_refreshed_time)
			: undefined;

		const expiresAt = session.access_token_expire_time
			? Date.parse(session.access_token_expire_time)
			: undefined;

		if (lastRefreshed && now - lastRefreshed <= REVALIDATE.ONE_MIN) {
			shouldValidate = false;
		} else {
			if (!expiresAt || expiresAt - now <= REVALIDATE.TEN_MIN) {
				shouldValidate = true;
			}
		}
	}

	const encrypted = encryptData(shouldValidate);

	const last_profile_retrieval_time = await getCookie<string>(
		COOKIES.LAST_PROFILE_RETRIEVAL,
		true,
	);

	if (
		!forceCheck &&
		last_profile_retrieval_time &&
		now - Number.parseInt(last_profile_retrieval_time, 10) < REVALIDATE.THREE_MIN
	) {
		return new Response(encrypted, {
			status: 200,
		});
	}

	const res = await fetch(`${API_URL}${URL_ENTITIES.PROFILE}`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			Cookie: `access_token=${session?.access_token}; refresh_token:${session?.refresh_token}`,
		},
	});

	setCookie(COOKIES.LAST_PROFILE_RETRIEVAL, encryptData(now.toString()));

	return new Response(encrypted, {
		status: res.status,
	});
}
