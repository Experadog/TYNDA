'use server';

import { EXTERNAL_APIS, TELEGRAM_CHAT_ID, TELEGRAM_KEY } from '@/lib';
import { getSession } from '../session-manager/session-manager';

type SerializedError = {
	message: string;
	stack?: string;
	componentStack?: string;
	payload?: unknown;
};

export async function sendErrorToTelegram(serializedError: SerializedError) {
	try {
		const session = await getSession();
		const userEmail = session?.user.email || 'Не авторизован';

		const timestamp = new Date().toLocaleString('ru-RU', {
			hour12: false,
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		});
		const message = `
🚨 *Ошибка в приложении* 🚨

🕰 *Дата и время:* ${timestamp}

👤 *Пользователь:* \`${userEmail}\`

📄 *Сообщение:*  
\`${serializedError.message}\`

📊 *Полезная нагрузка:*  
\`${serializedError.payload}\`

📌 *Stack:*  
\`\`\`
${(serializedError.stack || '').slice(0, 1000)}
\`\`\`

📍 *Component Stack:*  
\`\`\`
${(serializedError.componentStack || '').slice(0, 1000)}
\`\`\`
`;

		await fetch(`${EXTERNAL_APIS.TELEGRAM}/bot${TELEGRAM_KEY}/sendMessage`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: TELEGRAM_CHAT_ID,
				text: message,
				parse_mode: 'Markdown',
			}),
		});
	} catch (err) {
		console.error('Ошибка при отправке в Telegram:', err);
	}
}
