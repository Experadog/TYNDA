import { createRandomID } from '@/lib';
import type { ColumnConfigs, NestedKeyOf, ValueAtPath } from '@common';
import { LoadingSpinner } from '../ui/loading-spinner';
import BodyCell from './body-cell';
import EmptyRow from './empty-row';

type Props<T extends object> = {
	data: T[];
	columns: ColumnConfigs<T>;
	loading?: boolean;
	empty?: React.ReactNode;
	loadingNode?: React.ReactNode;
};

const getValueByPath = <T extends object, P extends NestedKeyOf<T>>(
	obj: T,
	path: P,
): ValueAtPath<T, P> => {
	return path.split('.').reduce((acc: unknown, key) => {
		if (typeof acc === 'object' && acc !== null) {
			return (acc as Record<string, unknown>)[key];
		}
		return undefined;
	}, obj) as ValueAtPath<T, P>;
};

const defaultLoadingNode = (
	<tbody className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
		<tr>
			<td colSpan={6}>
				<div>
					<LoadingSpinner className="text-orange size-10" />
				</div>
			</td>
		</tr>
	</tbody>
);

const TableBody = <T extends object>({ data, columns, loading, empty, loadingNode }: Props<T>) => {
	if (loading) return loadingNode || defaultLoadingNode;
	if (!data.length) return empty || <EmptyRow />;

	return (
		<tbody>
			{data.map((row) => (
				<tr key={createRandomID(4)}>
					{columns.map((col) => {
						const raw = getValueByPath(row, col.key);
						const content = col.render ? col.render(raw, row) : String(raw);
						const isData = Boolean(
							typeof content === 'string' ? content.trim() : content,
						);

						return (
							<BodyCell key={col.key} align={col.align} className={col.className}>
								{isData ? content : <p className="text-sm text-gray">Нет данных</p>}
							</BodyCell>
						);
					})}
				</tr>
			))}
		</tbody>
	);
};

export default TableBody;
