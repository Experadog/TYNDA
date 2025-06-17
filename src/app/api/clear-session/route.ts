import { encryptData } from '@/lib';
import { clearSession } from '@common';

export async function POST() {
	await clearSession();
	const encrypted = encryptData({ success: true });
	const response = new Response(encrypted, { status: 200 });

	return response;
}
