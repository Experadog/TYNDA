type RuMessages = typeof import('./messages/ru.json');
type KgMessages = typeof import('./messages/kg.json');
type EnMessages = typeof import('./messages/en.json');

declare interface ViewModel extends RuMessages, KgMessages, EnMessages {}

type PickMessagesByNamespaces<T extends string[]> = T extends (infer U)[]
	? U extends keyof ViewModel
		? { [K in U]: ViewModel[K] }
		: never
	: never;

type CapitalizedKeys<T> = {
	[K in keyof T]: K extends string
		? K extends Capitalize<K>
			? `${K}` | `${K}:${CapitalizedKeys<T[K]>}`
			: never
		: never;
}[keyof T];

declare type IntlNamespaces = CapitalizedKeys<RuMessages> | CapitalizedKeys<KgMessages> | CapitalizedKeys<EnMessages>;

declare type Locale = 'ru' | 'kg' | 'en';
declare type Theme = 'dark' | 'light';
