import { type SupportedLanguages, supportedLanguages } from '@/i18n/routing';
import { type ZodObject, type ZodRawShape, z } from 'zod';

export const createTranslatesShape = <T extends ZodRawShape>(
	baseTranslateSchema: T,
): Record<SupportedLanguages, ZodObject<T>> => {
	return supportedLanguages.reduce(
		(acc, lang) => {
			acc[lang] = z.object(baseTranslateSchema);
			return acc;
		},
		{} as Record<SupportedLanguages, ZodObject<T>>,
	);
};
