import { Session } from '@business-entities';
import { decryptData } from './decryptData';

export function getTokensFromSession(session?: string): string {
    if (!session) return '';

    try {
        const decrypted = decryptData(session);

        const { access_token, refresh_token } = decrypted as Session;

        if (!access_token || !refresh_token) {
            return '';
        }

        return `access_token=${access_token}; refresh_token=${refresh_token}; Path=/; HttpOnly; Secure`;
    } catch (error) {
        console.error('Ошибка обработки сессии:', error);
        return '';
    }
}
