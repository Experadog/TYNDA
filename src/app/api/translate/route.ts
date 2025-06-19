// app/api/translate/route.ts (или pages/api/translate.ts)

import { supportedLanguages } from '@/i18n/routing';
import { decryptData, encryptData } from '@/lib';
import { translate } from '@vitalets/google-translate-api';
import { HttpProxyAgent } from 'http-proxy-agent';
import { type NextRequest, NextResponse } from 'next/server';

const proxyList = ['https://57.129.81.201'];
// IN Testing

function getRandomProxy() {
	const index = Math.floor(Math.random() * proxyList.length);
	return proxyList[index];
}

export async function POST(req: NextRequest) {
	const body = await req.text();

	const encrypted = decryptData<{ text: string; to: Locale }>(body);

	const agent = new HttpProxyAgent('https://24.152.36.45:3130');

	if (
		!encrypted ||
		!encrypted.text ||
		!supportedLanguages.includes(encrypted?.to) ||
		encrypted.text.length > 7000
	) {
		return NextResponse.json({ error: 'Invalid required parameters' }, { status: 400 });
	}

	const { text, to } = encrypted;

	try {
		const result = await translate(text, {
			to,
			fetchOptions: {
				agent,
			},
		});

		const encrypted = encryptData(result);

		return new Response(encrypted, {
			status: 200,
		});
	} catch (error) {
		console.error('Translation failed:', error);
		const encrypted = encryptData({ text: 'Translation failed' });

		return new Response(encrypted, {
			status: 500,
		});
	}
}
