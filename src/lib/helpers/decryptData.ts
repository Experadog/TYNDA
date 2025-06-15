import { AES, enc } from 'crypto-js';
import { CRYPTO_KEY } from '../config/common';
import { LOGGER } from './chalkLogger';

export function decryptData<T>(encryptedData: string): T | null {
	try {
		const bytes = AES.decrypt(encryptedData, CRYPTO_KEY);
		const decryptedData = bytes.toString(enc.Utf8);

		if (decryptedData) {
			return JSON.parse(decryptedData);
		}
		return null;
	} catch (error) {
		LOGGER.error('Ошибка при расшифровке данных:');
		return null;
	}
}
