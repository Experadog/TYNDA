'use client';

import { Table, TableBody, TableFooter, TableHeader, TableWrapper } from '@components';
import { useCardContext } from '../../context/card-context-provider';

const CardTable = () => {
	const { table, pagination } = useCardContext();

	return (
		<TableWrapper>
			<Table>
				<TableHeader columns={table.columns} />
			</Table>

			<div className="flex-1 overflow-y-auto relative">
				<Table>
					<TableBody columns={table.columns} data={pagination.states.data} />
				</Table>
			</div>

			<Table>
				<TableFooter colSpan={table.columns.length} pagination={pagination} />
			</Table>
		</TableWrapper>
	);
};

export default CardTable;
