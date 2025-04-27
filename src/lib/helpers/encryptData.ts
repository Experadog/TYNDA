import { AES } from 'crypto-js';
import { CRYPTO_KEY } from '../config/common';

export function encryptData(data: unknown) {
	return AES.encrypt(JSON.stringify(data), CRYPTO_KEY).toString();
}
