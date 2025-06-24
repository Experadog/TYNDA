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

export const fileOrString = z.union([z.instanceof(File), z.string()]);

export const zRequiredString = (msg: string) =>
	z.string({ required_error: msg, invalid_type_error: msg });

export const zRequiredNumber = (msg: string) =>
	z.number({ required_error: msg, invalid_type_error: msg });

export const emptyToUndefined = (v: unknown) =>
	typeof v === 'string' && v.trim() === '' ? undefined : v;

export const emptyToNull = (v: unknown) => (typeof v === 'string' && v.trim() === '' ? null : v);

export const passwordPatterns = (msg: string) =>
	z
		.string()
		.regex(/[A-Z]/, msg)
		.regex(/[0-9]/, msg)
		.regex(/[^A-Za-z0-9]/, msg);

export const isoDateSchema = (message: string) =>
	z.string().refine((val) => !Number.isNaN(Date.parse(val)), { message });
