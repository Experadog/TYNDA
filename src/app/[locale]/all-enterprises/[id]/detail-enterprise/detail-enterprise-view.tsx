'use client';

import { useViewModel } from '@/i18n/getTranslate';

import type {
	EstablishmentDetailed,
	EstablishmentListItem,
} from '@/business-entities/establishment/EstablishmentEntity';
import dynamic from 'next/dynamic';
import type { FC } from 'react';
import Hero from './_components/hero';

const AllPhoto = dynamic(() => import('./_components/all-photo'), { ssr: true });
const WeAdvise = dynamic(() => import('./_components/we-advise'), { ssr: true });

interface IProps {
	item: EstablishmentDetailed;
	list: EstablishmentListItem[];
}

const DetailEnterpriseView: FC<IProps> = ({ item, list }) => {
	const viewModel = useViewModel(['DetailEnterprise', 'Shared']);

	return (
		<div className="max-w-[1340px] m-auto px-14 lg:px-5">
			<Hero
				viewModel={viewModel.DetailEnterprise}
				categoriesViewModel={viewModel.Shared.establishment_categories}
				item={item}
			/>
			<AllPhoto
				viewModel={viewModel.DetailEnterprise.allPhoto}
				imagesList={[item.cover, ...item.images]}
			/>
			<WeAdvise viewModel={viewModel.DetailEnterprise.weAdvise} list={list} />
		</div>
	);
};

export default DetailEnterpriseView;
