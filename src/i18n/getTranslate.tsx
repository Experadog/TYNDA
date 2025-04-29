'use client';
import { useLocale } from '@/providers/locale/locale-provider';
import kg from '@messages/kg.json';
import ru from '@messages/ru.json';

import { useMemo } from 'react';

const messages = { ru, kg } as const;

type Messages = typeof messages.ru;
type IntlNamespaces = keyof Messages;

type ViewModelReturn<T extends IntlNamespaces[]> = T extends [
	infer SingleNamespace extends IntlNamespaces,
]
	? Messages[SingleNamespace]
	: { [K in T[number]]: Messages[K] };

export function useViewModel<T extends IntlNamespaces[]>(namespaces: [...T]): ViewModelReturn<T> {
	const { locale } = useLocale();

	return useMemo(() => {
		const localeMessages = messages[locale];

		if (namespaces.length === 1) {
			return localeMessages[namespaces[0]] as ViewModelReturn<T>;
		}

		return namespaces.reduce(
			(acc, namespace) => {
				(acc as Record<string, unknown>)[namespace] = localeMessages[namespace];
				return acc;
			},
			{} as ViewModelReturn<T>,
		);
	}, [locale, namespaces]);
}
