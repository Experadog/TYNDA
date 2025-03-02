import { Session } from '@business-entities';
import { AES, enc } from 'crypto-js';
import { CRYPTO_KEY } from '../constants/constants';

export function decryptData(encryptedData: string): Session | null {
    try {
        const bytes = AES.decrypt(encryptedData, CRYPTO_KEY);
        const decryptedData = bytes.toString(enc.Utf8);

        if (decryptedData) {
            return JSON.parse(decryptedData);
        }
        return null;
    } catch (error) {
        console.error('Ошибка при расшифровке данных:', error);
        return null;
    }
}
