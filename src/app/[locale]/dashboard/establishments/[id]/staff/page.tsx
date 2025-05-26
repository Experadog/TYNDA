import { PAGINATION } from '@/lib';
import { getStaff } from '@/services';
import StaffView from './view/staff-view';
type Params = Promise<{
	id: string;
}>;

const Page = async ({ params }: { params: Params }) => {
	const { id } = await params;

	const response = await getStaff({ staff_establishment_id: id, ...PAGINATION.staff });

	return <StaffView establishment_id={id} staff={response.data} />;
};

export default Page;
