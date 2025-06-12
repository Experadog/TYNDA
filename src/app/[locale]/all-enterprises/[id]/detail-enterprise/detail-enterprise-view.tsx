'use client';

import { useViewModel } from '@/i18n/getTranslate';

import type { EstablishmentDetailed } from '@/business-entities/establishment/EstablishmentEntity';
import { type GetEstablishmentAllClientResponseModel, getEstablishmentAllClient } from '@/services';
import { usePagination } from '@common';
import { LoadingSpinner } from '@components';
import dynamic from 'next/dynamic';
import type { FC } from 'react';
import Hero from './_components/hero';

const AllPhoto = dynamic(() => import('./_components/all-photo'), { ssr: true });
const WeAdvise = dynamic(() => import('./_components/we-advise'), { ssr: true });

const CustomMap = dynamic(() => import('@/components/map/CustomMap'), {
	ssr: false,
	loading: () => (
		<div className="w-full h-full flex items-center justify-center">
			<LoadingSpinner className="size-6 text-gray" />
		</div>
	),
});

interface IProps {
	item: EstablishmentDetailed;
	data?: GetEstablishmentAllClientResponseModel['data'];
}

const DetailEnterpriseView: FC<IProps> = ({ item, data }) => {
	const viewModel = useViewModel(['DetailEnterprise', 'Shared']);

	const pagination = usePagination({
		entity: 'establishment',
		fetchFn: getEstablishmentAllClient,
		initialData: data,
		params: { category: item.category },
	});

	const {
		actions: { onGoNextPage },
		states: { list, hasNextPage, isLoading },
	} = pagination;

	return (
		<div className="max-w-[1340px] m-auto lg:px-5">
			<Hero
				viewModel={viewModel.DetailEnterprise}
				categoriesViewModel={viewModel.Shared.establishment_categories}
				item={item}
			/>

			<AllPhoto
				viewModel={viewModel.DetailEnterprise.allPhoto}
				imagesList={[item.cover, ...item.images]}
			/>

			<div className="w-full  mx-auto h-[500px] my-6 rounded-2xl overflow-hidden sm:h-[350px]">
				<CustomMap
					defaultMarkerCoordinates={[
						item.coordinates.latitude,
						item.coordinates.longitude,
					]}
					isStaticMark
					zoom={30}
					defaultPosition={[item.coordinates.latitude, item.coordinates.longitude]}
				/>
			</div>

			<WeAdvise
				viewModel={viewModel.DetailEnterprise.weAdvise}
				list={list}
				onGoNextPage={onGoNextPage}
				hasNextPage={hasNextPage}
				isLoading={isLoading}
			/>
		</div>
	);
};

export default DetailEnterpriseView;
