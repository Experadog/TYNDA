import { clearCookie } from '@/common/actions/clear-cookie';
import { COOKIES, encryptData } from '@/lib';
import { clearSession } from '@common';

export async function DELETE() {
	await clearSession();
	await clearCookie(COOKIES.LAST_REVALIDATE_KEY);
	const encrypted = encryptData({ success: true });
	const response = new Response(encrypted, { status: 200 });

	return response;
}
