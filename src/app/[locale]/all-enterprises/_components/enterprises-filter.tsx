'use client';
import type {
	EstablishmentCategory,
	EstablishmentListItem,
} from '@/business-entities/establishment/EstablishmentEntity';
import { useSetParams } from '@common';
import { Button, EstCategorySlider, LoadingSpinner } from '@components';
import { type FC, useMemo } from 'react';
// import { MdKeyboardArrowDown } from 'react-icons/md';
// import { TbFilter } from 'react-icons/tb';
import { useMediaQuery } from 'react-responsive';
import RecommendationCard from '../../(home)/_components/recommendationCard';

interface IProps {
	viewModel: ViewModel['AllEnterprises']['enterprisesFilter'];
	categoriesViewModel: ViewModel['Shared']['establishment_categories'];
	list: EstablishmentListItem[];
	isLoading: boolean;
	hasNextPage: boolean;
	onGoNextPage: () => Promise<void>;
}

const EnterprisesFilter: FC<IProps> = ({
	list,
	categoriesViewModel,
	isLoading,
	onGoNextPage,
	hasNextPage,
}) => {
	const isLargeScreen = useMediaQuery({ minWidth: 1025 });
	const isSmallScreen = useMediaQuery({ minWidth: 440 });

	const itemsCount = isLargeScreen ? 7 : isSmallScreen ? 4 : 3;
	const itemsSpacing = isLargeScreen ? 15 : 20;

	const { setParam, removeParam, getParam } = useSetParams();

	const selectedCategory = useMemo(() => getParam('category') || null, [getParam]);

	const onSelectCategory = (selected: EstablishmentCategory) => {
		if (selectedCategory === selected) {
			removeParam('category');
		} else {
			setParam('category', selected);
		}
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
					<div className="grid grid-cols-4 md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 justify-items-center">
						{list.map((establishment) => (
							<RecommendationCard
								key={establishment.id}
								establishment={establishment}
							/>
						))}
					</div>

					{hasNextPage && (
						<Button
							className="py-5 my-5 max-w-[400px] w-full mx-auto rounded-xl"
							variant={'yellow'}
							disableAnimation
							onClick={onGoNextPage}
							disabled={isLoading}
						>
							{isLoading ? <LoadingSpinner /> : 'Загрузить еще'}
						</Button>
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
