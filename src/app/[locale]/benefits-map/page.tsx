import { PAGINATION, type SearchParamsType, parseSearchParams } from '@/lib';
import { getEstablishmentAllClient, getEstablishmentAllMap } from '@/services';
import BenefitsMapView from './benefits-map-view';

const Page = async ({ searchParams }: { searchParams: Promise<SearchParamsType> }) => {
	const params = parseSearchParams(await searchParams);

	const estMapResponse = await getEstablishmentAllMap({
		category: params.category,
		search_name: params.search_name,
		region: params.region,
		max_average_bill: params.max_average_bill,
		min_average_bill: params.min_average_bill,
		has_discount: params.has_discount,
		from_user_distance_in_meter: params.from_user_distance_in_meter,
		lat: params.lat,
		lon: params.lon,
	});

	const estClientResponse = await getEstablishmentAllClient({
		category: params.category,
		search_name: params.search_name,
		region: params.region,
		max_average_bill: params.max_average_bill,
		min_average_bill: params.min_average_bill,
		has_discount: params.has_discount,
		sort_by_average_bill: params.sort_by_average_bill,
		from_user_distance_in_meter: params.from_user_distance_in_meter,
		lat: params.lat,
		lon: params.lon,
		...PAGINATION.establishment,
	});

	return (
		<BenefitsMapView
			est_map_list={estMapResponse.data}
			params={params}
			est_client_list={estClientResponse.data}
		/>
	);
};

export default Page;
