type Translates = Partial<Record<Locale, Record<string, string>>>;

type ExtractKeys<T extends Translates> = T[keyof T] extends Record<string, string>
	? keyof T[keyof T]
	: never;

export function getTranslateByKey<
	T extends Translates,
	L extends Locale,
	K extends ExtractKeys<T> & string,
>(lang: L, translates: T, key: K): string {
	const translation = translates?.[lang];
	if (!translation) return 'no translates';
	return translation[key] ?? 'no translates';
}
