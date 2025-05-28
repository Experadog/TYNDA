'use client';

import UsersModal from '../_component/modal/users-modal';
import UsersTable from '../_component/users-table/users-table';

const UsersView = () => {
	return (
		<>
			<UsersTable />
			<UsersModal />
		</>
	);
};

export default UsersView;
