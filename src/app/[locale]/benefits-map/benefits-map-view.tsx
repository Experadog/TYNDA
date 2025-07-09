'use client';

import {
	type EstablishmentClientRetrievalResponseModel,
	getEstablishmentAllClient,
} from '@/services';
import type { EstablishmentMap } from '@business-entities';
import { type Params, usePagination } from '@common';
import { LoadingSpinner } from '@components';
import dynamic from 'next/dynamic';
import MarkerSidebar from './_components/marker-sidebar/marker-sidebar';
import { useBenefitMapUseCase } from './use-cases/useBenefitMapUseCase';

type Props = {
	est_map_list: EstablishmentMap[];
	est_client_list: EstablishmentClientRetrievalResponseModel['data'];
	params?: Params;
};

const MainMap = dynamic(() => import('./_components/map/main-map'), {
	ssr: false,
	loading: () => (
		<div className="w-full full-height flex items-center justify-center">
			<LoadingSpinner className="size-6 text-gray" />
		</div>
	),
});

const BenefitsMapView = ({ est_map_list, est_client_list, params }: Props) => {
	const useCase = useBenefitMapUseCase({ est_map_list, params });

	const dependedParams = [
		params?.category,
		params?.search_name,
		params?.region,
		params?.max_average_bill,
		params?.min_average_bill,
		params?.has_discount,
		params?.sort_by_average_bill,
		params?.from_user_distance_in_meter,
	];

	const pagination = usePagination({
		entity: 'establishment',
		fetchFn: getEstablishmentAllClient,
		initialData: est_client_list,
		keys: dependedParams,
		params: {
			category: params?.category,
			search_name: params?.search_name,
			region: params?.region,
			max_average_bill: params?.max_average_bill,
			min_average_bill: params?.min_average_bill,
			sort_by_average_bill: params?.sort_by_average_bill,
			has_discount: params?.has_discount,
			from_user_distance_in_meter: params?.from_user_distance_in_meter,
		},
	});

	return (
		<div className="w-full full-height flex relative">
			<MarkerSidebar
				isFilterOpen={useCase.filter.isOpen}
				onOpenChangeFilter={useCase.filter.onOpenChange}
				pagination={pagination}
				searchValue={useCase.search.searchValue}
				onChange={useCase.search.handleSearch}
				userCoords={useCase.user.coords}
			/>
			<MainMap useCase={useCase} />

			{useCase.loading.isDetailedLoading ? (
				<div className="absolute inset-0 z-[99999] bg-transparent" />
			) : null}
		</div>
	);
};

export default BenefitsMapView;
