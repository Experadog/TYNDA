import type { AsyncPageRule } from '@common';
import { getNestedValue } from './getNestedValue';

export type Props<Types extends unknown[]> = {
	async_pages: {
		[Index in keyof Types]: AsyncPageRule<Types[Index]>;
	};
	static_pages?: {
		viewModel: ViewModel['Shared'];
		keys: (keyof ViewModel['Shared'])[];
	};
};

export function createDynamicLabels<Types extends unknown[]>({
	async_pages,
	static_pages,
}: Props<Types>): Record<string, string> {
	const dynamicLabels: Record<string, string> = {};

	for (const page of async_pages) {
		const [keyField, valueField] = page.rules;

		for (const item of page.data) {
			const key = getNestedValue(item, keyField);

			let value: string | null = null;

			if (Array.isArray(valueField)) {
				const parts = valueField
					.map((field) => getNestedValue(item, field))
					.filter((val) => typeof val === 'string') as string[];
				value = parts.join(' ');
			} else {
				const single = getNestedValue(item, valueField);
				if (typeof single === 'string') {
					value = single;
				}
			}

			if (typeof key === 'string' && typeof value === 'string') {
				dynamicLabels[key] = value;
			}
		}
	}

	if (static_pages) {
		const { viewModel, keys } = static_pages;

		for (const vmKey of keys) {
			const vmObject = viewModel[vmKey];
			if (typeof vmObject === 'object' && vmObject !== null) {
				for (const [key, value] of Object.entries(vmObject)) {
					if (value && typeof value === 'object' && 'label' in value) {
						dynamicLabels[key] = value.label;
					}
				}
			}
		}
	}

	return dynamicLabels;
}
