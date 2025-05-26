import { useStaffContext } from '../../context/staff-context-provider';
import StaffDataRow from './variants/staff-data-row';
import StaffEmptyRow from './variants/staff-empty-row';
import StaffLoadingRow from './variants/staff-loading-row';

const StaffTableBody = () => {
	const { modal, pagination, deletion } = useStaffContext();
	const {
		states: { staffList, isLoading },
	} = pagination;

	if (isLoading) {
		return <StaffLoadingRow />;
	}

	if (!staffList.length) {
		return <StaffEmptyRow />;
	}

	return (
		<StaffDataRow
			data={staffList}
			onDelete={deletion.confirmModal.open}
			onUpdate={modal.actions.onOpen}
		/>
	);
};

export default StaffTableBody;
