'use client';
import type { EstablishmentCategory } from '@/business-entities/establishment/EstablishmentEntity';
import { useRouter } from '@/i18n/routing';
import { SEARCH_PARAMS } from '@/lib';
import type { GetEstablishmentAllClientResponseModel } from '@/services';
import { Button, EstCategorySlider, LoadingSpinner } from '@components';
import { useSearchParams } from 'next/navigation';
import { type FC, useState } from 'react';
// import { MdKeyboardArrowDown } from 'react-icons/md';
// import { TbFilter } from 'react-icons/tb';
import { useMediaQuery } from 'react-responsive';
import RecommendationCard from '../../(home)/_components/recommendationCard';
import { useAllEnterprisesUseCase } from '../use-cases/useAllEnterprisesUseCase';

interface IProps {
	viewModel: ViewModel['AllEnterprises']['enterprisesFilter'];
	categoriesViewModel: ViewModel['Shared']['establishment_categories'];
	data: GetEstablishmentAllClientResponseModel['data'];
}

const EnterprisesFilter: FC<IProps> = ({ data, categoriesViewModel }) => {
	const { viewModel, pagination } = useAllEnterprisesUseCase({ initialData: data });
	const {
		states: { list, isLoading },
		actions: { onGoNextPage },
	} = pagination;
	const isLargeScreen = useMediaQuery({ minWidth: 1025 });
	const isSmallScreen = useMediaQuery({ minWidth: 440 });

	const itemsCount = isLargeScreen ? 7 : isSmallScreen ? 4 : 3;
	const itemsSpacing = isLargeScreen ? 15 : 20;
	const router = useRouter();
	const searchParams = useSearchParams();

	const [selectedCategory, setSelectedCategory] = useState<EstablishmentCategory | null>(
		searchParams.get(SEARCH_PARAMS.category.key) as EstablishmentCategory,
	);

	const onSelectCategory = (selected: EstablishmentCategory) => {
		if (selectedCategory === selected) {
			setSelectedCategory(null);

			const params = new URLSearchParams(searchParams.toString());
			params.delete(SEARCH_PARAMS.category.key);
			router.replace(`?${params.toString()}`, { scroll: false });
			return;
		}

		setSelectedCategory(selected);
		const params = new URLSearchParams(searchParams.toString());
		params.set(SEARCH_PARAMS.category.key, selected);
		router.replace(`?${params.toString()}`, { scroll: false });
	};

	return (
		<div className="mt-10 pb-[248px] lg:pb-14 lg:mt-5">
			<EstCategorySlider
				onSelect={onSelectCategory}
				selectedCategory={selectedCategory}
				slidesPerView={itemsCount}
				spacing={itemsSpacing}
				viewModel={categoriesViewModel}
			/>

			{list.length ? (
				<div className="flex flex-col gap-5">
					<div className="grid grid-cols-4 lg:grid-cols-2 mt-[60px] lg:mt-[30px] gap-x-5 gap-y-[34px] lg:gap-x-[10px] lg:gap-y-[20px]">
						{list.map((establishment) => (
							<RecommendationCard
								key={establishment.id}
								establishment={establishment}
							/>
						))}
					</div>

					{isLoading ? (
						<LoadingSpinner className="mx-auto size-10 text-yellow" />
					) : (
						list.length !== data.total && (
							<Button
								className="py-5 max-w-[400px] w-full mx-auto mt-auto rounded-xl"
								variant={'yellow'}
								disableAnimation
								onClick={onGoNextPage}
							>
								Загрузить еще
							</Button>
						)
					)}
				</div>
			) : (
				<div className="flex items-center justify-center mt-14">
					<p className="text-xl font-semibold text-gray-800">
						По выбранной категории предприятий пока нет
					</p>
				</div>
			)}
		</div>
	);
};

//Filtration
/* <div className="flex items-center gap-5 lg:hidden">
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
			</div> */

export default EnterprisesFilter;
