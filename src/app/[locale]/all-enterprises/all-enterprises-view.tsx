'use client';
import type { EstablishmentListItem } from '@/business-entities/establishment/EstablishmentEntity';
import type { Paginated, Params } from '@common';
import dynamic from 'next/dynamic';
import type { FC } from 'react';
import Hero from './_components/hero';
import { useAllEnterprisesUseCase } from './use-cases/useAllEnterprisesUseCase';

const EnterprisesFilter = dynamic(() => import('./_components/enterprises-filter'), { ssr: true });

interface IProps {
	data: Paginated<EstablishmentListItem>;
	params: Params;
}

const AllEnterprisesView: FC<IProps> = ({ data, params }) => {
	const { viewModel, pagination } = useAllEnterprisesUseCase({ initialData: data, params });
	const {
		actions: { onGoNextPage },
		states: { list, hasNextPage, isLoading },
	} = pagination;

	return (
		<>
			<Hero heroViewModel={viewModel.AllEnterprises.hero} />
			<div className="lg:px-5 max-w-[1340px] m-auto">
				<EnterprisesFilter
					categoriesViewModel={viewModel.Shared.establishment_categories}
					viewModel={viewModel.AllEnterprises.enterprisesFilter}
					isLoading={isLoading}
					list={list}
					onGoNextPage={onGoNextPage}
					hasNextPage={hasNextPage}
				/>
			</div>
		</>
	);
};

export default AllEnterprisesView;
