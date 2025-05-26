import type { NestedValue } from '@common';

export function getNestedValue<T, P extends string>(
	obj: T,
	path: P,
): NestedValue<T, P> | undefined {
	const keys = path.split('.') as (keyof unknown)[];
	let result: unknown = obj;

	for (const key of keys) {
		if (result == null) return undefined;
		result = (result as Record<string, unknown>)[key as string];
	}

	return result as NestedValue<T, P> | undefined;
}
