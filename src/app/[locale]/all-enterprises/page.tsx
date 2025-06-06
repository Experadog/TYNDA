import { PAGINATION, type SearchParamsType, parseSearchParams } from '@/lib';
import { getEstablishmentAllClient } from '@/services/establishment/establishmentService';
import AllEnterprisesView from './all-enterprises-view';

const Page = async ({ searchParams }: { searchParams: Promise<SearchParamsType> }) => {
	const params = parseSearchParams(await searchParams);

	const response = await getEstablishmentAllClient({ ...PAGINATION.establishment, ...params });

	return <AllEnterprisesView data={response.data} params={params} />;
};

export default Page;
