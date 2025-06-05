import { PAGINATION, type SearchParamsType, parseSearchParams } from '@/lib';
import { getEstablishmentAllClient } from '@/services/establishment/establishmentService';
import type { Params } from '@common';
import AllEnterprisesView from './all-enterprises-view';

const Page = async ({ searchParams }: { searchParams: Promise<SearchParamsType> }) => {
	const { category } = parseSearchParams(await searchParams);

	const params: Params = { ...PAGINATION.establishment, category };

	const response = await getEstablishmentAllClient(params);

	return <AllEnterprisesView data={response.data} />;
};

export default Page;
