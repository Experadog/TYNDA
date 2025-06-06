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

	const detailedResponse = await getEstablishmentDetail(id);
	const category = detailedResponse.data.establishment.category;

	const listResponse = await getEstablishmentAllClient({
		...PAGINATION.establishment,
		category,
	});

	return (
		<DetailEnterpriseView
			item={detailedResponse?.data.establishment}
			data={listResponse.data}
		/>
	);
};

export default Page;
