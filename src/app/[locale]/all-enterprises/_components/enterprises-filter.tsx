'use client';
import type { EstablishmentCategory, EstablishmentListItem } from '@/business-entities/establishment/EstablishmentEntity';
import type { Paginated } from '@common';
import { EstCategorySlider } from '@components';
import { useState, type FC } from 'react';
// import { MdKeyboardArrowDown } from 'react-icons/md';
// import { TbFilter } from 'react-icons/tb';
import { useMediaQuery } from 'react-responsive';
import RecommendationCard from '../../(home)/_components/recommendationCard';
import { useAllEnterprisesUseCase } from '../use-cases/useAllEnterprisesUseCase';

interface IProps {
	viewModel: ViewModel['AllEnterprises']['enterprisesFilter'];
	categoriesViewModel: ViewModel['Shared']['establishment_categories'];
	data: Paginated<EstablishmentListItem>;
}

const EnterprisesFilter: FC<IProps> = ({ data, categoriesViewModel }) => {
	const { viewModel } = useAllEnterprisesUseCase();
	const isLargeScreen = useMediaQuery({ minWidth: 1025 });
	const isSmallScreen = useMediaQuery({ minWidth: 440 });

	const itemsCount = isLargeScreen ? 7 : isSmallScreen ? 4 : 3;
	const itemsSpacing = isLargeScreen ? 15 : 20;

	const [selectedCategory, setSelectedCategory] = useState<EstablishmentCategory | null>(null);

	const filteredEstablishments = selectedCategory
		? data.items.filter((establishment) => establishment.category === selectedCategory)
		: data.items;

	return (
		<div className="mt-10 pb-[248px] lg:pb-14 lg:mt-5">
			<EstCategorySlider
				onSelect={(category) => setSelectedCategory(category)}
				slidesPerView={itemsCount}
				spacing={itemsSpacing}
				viewModel={categoriesViewModel}
			/>
			{/* <div className="flex items-center gap-5 lg:hidden">
				<Button className="bg-background_5 hover:bg-yellow text-white flex items-center gap-1 rounded-[22px] w-36 h-10">
					{viewModel.enterprisesFilter.button1} <MdKeyboardArrowDown />
				</Button>
				<Button className="bg-background_5 hover:bg-yellow text-white flex items-center gap-1 rounded-[22px] min-w-36 h-10">
					{viewModel.enterprisesFilter.button2} <MdKeyboardArrowDown />
				</Button>
				<Button className="bg-background_5 hover:bg-yellow text-white flex items-center gap-1 rounded-[22px] w-36 h-10">
					{viewModel.enterprisesFilter.button3} <MdKeyboardArrowDown />
				</Button>
			</div>
			<div className="hidden w-full lg:flex items-center justify-center">
				<Button
					variant="yellow"
					className="flex items-center gap-2 w-[353px] rounded-[35px]"
				>
					<TbFilter />
					{viewModel.enterprisesFilter.button1}
				</Button>
			</div> */}
			{filteredEstablishments.length ? (<div className="grid grid-cols-4 lg:grid-cols-2 mt-[60px] lg:mt-[30px] gap-x-5 gap-y-[34px] lg:gap-x-[10px] lg:gap-y-[20px]">
				{filteredEstablishments.map((establishment) => (
					<RecommendationCard
						key={establishment.id}
						establishment={establishment}
					/>
				))}
			</div>) : (<div className='flex items-center justify-center mt-14'>
				<p className='text-xl font-semibold text-gray-800'>По выбранной категории предприятий пока нет</p>
			</div>)}

		</div>
	);
};

export default EnterprisesFilter;
