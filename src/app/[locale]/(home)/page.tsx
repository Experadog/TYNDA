import { PAGINATION, type SearchParamsType, parseSearchParams } from '@/lib';
import { getEstablishmentAllClient } from '@/services/establishment/establishmentService';
import HomeView from './home-view';

const Home = async ({ searchParams }: { searchParams: Promise<SearchParamsType> }) => {
	const { category } = parseSearchParams(await searchParams);

	const establishmentAllClient = await getEstablishmentAllClient({
		...PAGINATION.establishment,
		category,
	});

	return <HomeView establishments={establishmentAllClient?.data?.items || []} />;
};

export default Home;
