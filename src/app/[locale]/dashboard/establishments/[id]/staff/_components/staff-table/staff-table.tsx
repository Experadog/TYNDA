'use client';

import type { Staff } from '@business-entities';
import { Table, TableBody, TableFooter, TableHeader, TableWrapper } from '@components';
import { useStaffContext } from '../../context/staff-context-provider';
import StaffEmptyRow from './staff-empty-row';

const StaffTable = () => {
	const { pagination, table } = useStaffContext();

	return (
		<TableWrapper>
			<Table>
				<TableHeader columns={table.columns} />
			</Table>

			<div className="flex-1 overflow-y-auto relative">
				<Table>
					<TableBody<Staff>
						data={pagination.states.data}
						columns={table.columns}
						loading={pagination.states.isLoading}
						empty={<StaffEmptyRow />}
					/>
				</Table>
			</div>

			<Table>
				<TableFooter colSpan={table.columns.length} pagination={pagination} />
			</Table>
		</TableWrapper>
	);
};

export default StaffTable;
