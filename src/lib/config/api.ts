export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const LOCAL_API_URL = process.env.NEXT_PUBLIC_LOCAL_API_URL;

export const STREET_MAP_API_URL = process.env.NEXT_PUBLIC_OPEN_STREET_MAP_API;
export const TELEGRAM_API = process.env.NEXT_PUBLIC_TELEGRAM_API;

export const EXTERNAL_APIS = {
	STREET_MAP_API_URL: STREET_MAP_API_URL,
	TELEGRAM: TELEGRAM_API,
} as const;

export const TELEGRAM_KEY = process.env.NEXT_PUBLIC_TELEGRAM_BOT_KEY;
export const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
