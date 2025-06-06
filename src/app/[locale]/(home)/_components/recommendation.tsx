'use client';

import type {
	EstablishmentCategory,
	EstablishmentListItem,
} from '@/business-entities/establishment/EstablishmentEntity';
import { Link } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { useSetParams } from '@common';
import { Button, EstCategorySlider, Translate } from '@components';
import { type FC, useMemo } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useMediaQuery } from 'react-responsive';
import RecommendationCard from './recommendationCard';

interface IProps {
	recommendationViewModel: ViewModel['Home']['recommendation'];
	sharedViewModel: ViewModel['Shared'];
	establishments: EstablishmentListItem[];
}

const Recommendation: FC<IProps> = ({
	establishments,
	recommendationViewModel,
	sharedViewModel,
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
		<div className="mt-[75px] lg:mt-[60px] ">
			<Translate direction="right" distance={100} animateOnce={false}>
				<div className="flex flex-col items-center justify-center gap-5 lg:px-5">
					<Translate direction="right" distance={100} animateOnce={false}>
						<h2 className="font-medium text-4xl md:text-2xl exs:text-lg max-w-[830px] text-center">
							{recommendationViewModel.description}
						</h2>
					</Translate>
				</div>
			</Translate>

			<Translate direction="down" distance={60} animateOnce={false}>
				<EstCategorySlider
					onSelect={onSelectCategory}
					slidesPerView={itemsCount}
					selectedCategory={selectedCategory}
					spacing={itemsSpacing}
					viewModel={sharedViewModel.establishment_categories}
				/>
			</Translate>

			{establishments.length ? (
				<div className="grid grid-cols-4 md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 justify-items-center">
					{establishments.map((establishment) => (
						<RecommendationCard establishment={establishment} key={establishment.id} />
					))}
				</div>
			) : (
				<div className="flex items-center justify-center mt-14">
					<p className="text-xl font-semibold text-gray-800">
						По выбранной категории предприятий пока нет
					</p>
				</div>
			)}

			<div className="flex items-center justify-center px-4">
				<Link href={PAGES.ENTERPRISES_ALL} className="w-full max-w-[320px]">
					<Button
						variant="yellow"
						className="mt-[34px] rounded-[42px] w-full px-5 py-[14px] h-[52px] flex items-center justify-center gap-2 text-base md:text-lg"
					>
						{recommendationViewModel.button}
						<FiArrowRight className="w-5 h-5 md:w-6 md:h-6" />
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default Recommendation;
