import type { ClassValue } from 'clsx';
import type { ReactNode } from 'react';

export type NestedKeyOf<ObjectType extends object> = {
	[Key in keyof ObjectType & string]: ObjectType[Key] extends object
		? ObjectType[Key] extends Array<unknown>
			? Key
			: `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
		: `${Key}`;
}[keyof ObjectType & string];

export type ValueAtPath<T, P extends string> = P extends `${infer K}.${infer Rest}`
	? K extends keyof T
		? T[K] extends object
			? ValueAtPath<T[K], Rest>
			: never
		: never
	: P extends keyof T
		? T[P]
		: never;

type ColumnConfig<T extends object, P extends NestedKeyOf<T> = NestedKeyOf<T>> = {
	key: P;
	title: string | ReactNode;
	className?: ClassValue;
	align?: 'left' | 'center' | 'right';
	render?: (value: ValueAtPath<T, P>, row: T) => React.ReactNode;
};

export type ColumnConfigs<T extends object> = {
	[P in NestedKeyOf<T>]: ColumnConfig<T, P>;
}[NestedKeyOf<T>][];
