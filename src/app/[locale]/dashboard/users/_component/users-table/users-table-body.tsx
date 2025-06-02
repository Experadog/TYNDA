import { useUsersContext } from '../../context/users-context-provider';
import UsersDataRow from './variants/users-data-row';
import UsersEmptyRow from './variants/users-empty-row';
import UsersLoadingRow from './variants/users-loading-row';

const StaffTableBody = () => {
	const { pagination } = useUsersContext();
	const {
		table_params: {
			states: { data, isLoading },
		},
	} = pagination;

	if (isLoading) {
		return <UsersLoadingRow />;
	}

	if (!data.length) {
		return <UsersEmptyRow />;
	}

	return <UsersDataRow data={data} />;
};

export default StaffTableBody;
