'use client';
import type { EstablishmentListItem } from '@/business-entities/establishment/EstablishmentEntity';
import { useViewModel } from '@/i18n/getTranslate';
import type { Paginated } from '@common';
import dynamic from 'next/dynamic';
import type { FC } from 'react';
import Hero from './_components/hero';

const EnterprisesFilter = dynamic(() => import('./_components/enterprises-filter'), { ssr: true });

interface IProps {
	data: Paginated<EstablishmentListItem>;
}

const AllEnterprisesView: FC<IProps> = ({ data }) => {
	const viewModel = useViewModel(['AllEnterprises', 'Shared']);

	return (
		<>
			<Hero
				categoriesViewModel={viewModel.Shared.establishment_categories}
				heroViewModel={viewModel.AllEnterprises.hero}
			/>
			<div className="px-14 lg:px-5 max-w-[1340px] m-auto">
				<EnterprisesFilter
					viewModel={viewModel.AllEnterprises.enterprisesFilter}
					data={data}
				/>
			</div>
		</>
	);
};

export default AllEnterprisesView;
