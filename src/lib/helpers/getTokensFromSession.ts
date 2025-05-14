import type { Session } from '@business-entities';
import { LOGGER } from './chalkLogger';
import { decryptData } from './decryptData';

export function getTokensFromSession(session?: string): string {
	if (!session) return '';

	try {
		const decrypted = decryptData(session);

		const { access_token, refresh_token } = decrypted as Session;

		if (!access_token || !refresh_token) {
			return '';
		}

		return `access_token=${access_token}; refresh_token=${refresh_token}`;
	} catch (error) {
		LOGGER.error('Ошибка обработки сессии:');
		return '';
	}
}
