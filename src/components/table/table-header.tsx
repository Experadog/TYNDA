import type { ColumnConfigs } from '@common';
import HeaderCell from './header-cell';

type Props<T extends object> = {
	columns: ColumnConfigs<T>;
};

const TableHeader = <T extends object>({ columns }: Props<T>) => (
	<thead>
		<tr className="bg-background_2">
			{columns.map((col) => (
				<HeaderCell key={col.key} align={col.align} className={col.className}>
					{col.title}
				</HeaderCell>
			))}
		</tr>
	</thead>
);

export default TableHeader;
