import { getEstablishmentAllClient } from '@/services/establishment/establishmentService';
import AllEnterprisesView from './all-enterprises-view';

const Page = async () => {
	const response = await getEstablishmentAllClient({});

	return <AllEnterprisesView data={response.data} />;
};

export default Page;
