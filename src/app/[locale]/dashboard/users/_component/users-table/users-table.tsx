import type { UserListItem } from '@business-entities';
import { Table, TableBody, TableFooter, TableHeader, TableWrapper } from '@components';
import { useUsersContext } from '../../context/users-context-provider';

const UsersTable = () => {
	const {
		pagination: { table_params },
		table,
	} = useUsersContext();

	return (
		<TableWrapper>
			<Table>
				<TableHeader columns={table.columns} />
			</Table>

			<div className="flex-1 overflow-y-auto relative">
				<Table>
					<TableBody<UserListItem>
						data={table_params.states.data}
						columns={table.columns}
						loading={table_params.states.isLoading}
					/>
				</Table>
			</div>

			<Table>
				<TableFooter colSpan={table.columns.length} pagination={table_params} />
			</Table>
		</TableWrapper>
	);
};

export default UsersTable;
