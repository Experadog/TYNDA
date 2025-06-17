import { REVALIDATE, encryptData } from '@/lib';
import { getSession } from '@common';

export async function GET() {
	const session = await getSession();

	let shouldValidate = false;
	const now = Date.now();

	if (session) {
		const lastRefreshed = session.last_refreshed_time
			? Date.parse(session.last_refreshed_time)
			: undefined;

		const expiresAt = session.access_token_expire_time
			? Date.parse(session.access_token_expire_time)
			: undefined;

		if (lastRefreshed && now - lastRefreshed <= REVALIDATE.FIFTEEN_SECONDS) {
			shouldValidate = false;
		} else {
			if (!expiresAt || expiresAt - now <= REVALIDATE.FIFTEEN_SECONDS) {
				shouldValidate = true;
			}
		}
	}

	const encrypted = encryptData(shouldValidate);

	return new Response(encrypted, {
		headers: { 'Content-Type': 'application/json' },
	});
}
