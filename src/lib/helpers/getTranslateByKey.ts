import type { SupportedLanguages } from '@/i18n/routing';

export function getTranslateByKey<
	L extends SupportedLanguages,
	T extends Record<L, Record<string, unknown>>,
	K extends keyof T[L],
>(lang: L, translates: T | null | undefined, key: K): T[L][K] {
	const translation = translates?.[lang];
	const value = translation?.[key];

	if (value !== undefined) {
		return value as T[L][K];
	}

	// Определяем дефолт по типу:
	if (Array.isArray(value)) {
		return [] as T[L][K];
	}

	// Хак: проверяем typeof через key
	const defaultValue: unknown = typeof value === 'string' ? '' : Array.isArray(value) ? [] : '';
	return defaultValue as T[L][K];
}
