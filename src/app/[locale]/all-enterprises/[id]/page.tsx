import { PAGES, PAGINATION } from '@/lib';
import {
	getEstablishmentAllClient,
	getEstablishmentDetail,
} from '@/services/establishment/establishmentService';
import { permanentRedirect } from 'next/navigation';
import DetailEnterpriseView from './detail-enterprise/detail-enterprise-view';

type Params = Promise<{
	id: string;
}>;

const Page = async ({ params }: { params: Params }) => {
	const { id } = await params;

	if (!id) {
		permanentRedirect(PAGES.HOME);
	}

	const [detailedResponse, listResponse] = await Promise.all([
		getEstablishmentDetail(id),
		getEstablishmentAllClient(PAGINATION.establishment),
	]);

	return (
		<DetailEnterpriseView
			item={detailedResponse?.data.establishment}
			list={listResponse.data.items}
		/>
	);
};

export default Page;
