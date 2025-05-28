'use client';

import UsersTableBody from './users-table-body';
import UsersTableFooter from './users-table-footer';
import UsersTableHead from './users-table-head';

const UsersTable = () => {
	return (
		<div className="w-full h-full mt-0 mb-0">
			<div className="w-full h-full flex flex-col border-light_gray border rounded-lg overflow-hidden bg-background_6">
				<table className="table-fixed border-separate border-spacing-0 w-full">
					<UsersTableHead />
				</table>

				<div className="flex-1 overflow-y-auto relative">
					<table className="table-fixed border-separate border-spacing-0 w-full">
						<UsersTableBody />
					</table>
				</div>

				<table className="table-fixed border-separate border-spacing-0 w-full">
					<UsersTableFooter />
				</table>
			</div>
		</div>
	);
};

export default UsersTable;
