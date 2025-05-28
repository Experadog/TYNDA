import type { StaffRetrievalResponseModel } from '@/services';
import StaffDeletionModal from '../_components/modal/staff-deletion-modal';
import StaffModal from '../_components/modal/staff-modal';
import StaffTable from '../_components/staff-table/staff-table';
import { StaffContextProvider } from '../context/staff-context-provider';

type Props = {
	establishment_id: string;
	staff: StaffRetrievalResponseModel['data'];
};

const StaffView = ({ establishment_id, staff }: Props) => {
	return (
		<StaffContextProvider staff={staff}>
			<StaffTable />
			<StaffModal establishment_id={establishment_id} />
			<StaffDeletionModal />
		</StaffContextProvider>
	);
};

export default StaffView;
