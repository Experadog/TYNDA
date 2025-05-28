'use client';

import StaffTableBody from './staff-table-body';
import StaffTableFooter from './staff-table-footer';
import StaffTableHead from './staff-table-head';

const StaffTable = () => {
	return (
		<div className="w-full h-full mt-0 mb-0">
			<div className="w-full h-full flex flex-col border-light_gray border rounded-lg overflow-hidden bg-background_6">
				<table className="table-fixed border-separate border-spacing-0 w-full">
					<StaffTableHead />
				</table>

				<div className="flex-1 overflow-y-auto relative">
					<table className="table-fixed border-separate border-spacing-0 w-full">
						<StaffTableBody />
					</table>
				</div>

				<table className="table-fixed border-separate border-spacing-0 w-full">
					<StaffTableFooter />
				</table>
			</div>
		</div>
	);
};

export default StaffTable;
