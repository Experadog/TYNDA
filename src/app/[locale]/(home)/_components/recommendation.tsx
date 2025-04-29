'use client';

import type {
	EstablishmentCategory,
	EstablishmentListItem,
} from '@/business-entities/establishment/EstablishmentEntity';
import { Button, EstCategorySlider, Translate } from '@components';
import { type FC, useState } from 'react';
import { GoArrowRight } from 'react-icons/go';
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
	if (establishments.length === 0) return null;

	const isLargeScreen = useMediaQuery({ minWidth: 1025 });
	const isSmallScreen = useMediaQuery({ minWidth: 440 });

	const itemsCount = isLargeScreen ? 7 : isSmallScreen ? 4 : 3;
	const itemsSpacing = isLargeScreen ? 15 : 20;

	const [selectedCategory, setSelectedCategory] = useState<EstablishmentCategory | null>(null);

	const filteredEstablishments = selectedCategory
		? establishments.filter((establishment) => establishment.category === selectedCategory)
		: establishments;

	return (
		<div className="mt-[75px] lg:mt-[60px]">
			<Translate direction="right" distance={100} animateOnce={false}>
				<div className="flex flex-col items-center justify-center gap-5 lg:px-5">
					<h3 className="uppercase text-lg font-semibold">
						{recommendationViewModel.title}
					</h3>
					<Translate direction="right" distance={100} animateOnce={false}>
						<h2 className="font-medium text-4xl md:text-2xl exs:text-lg max-w-[830px] text-center">
							{recommendationViewModel.description}
						</h2>
					</Translate>
				</div>
			</Translate>

			<Translate direction="down" distance={60} animateOnce={false}>
				<EstCategorySlider
					onSelect={(category) => setSelectedCategory(category)}
					slidesPerView={itemsCount}
					spacing={itemsSpacing}
					viewModel={sharedViewModel.establishment_categories}
				/>
			</Translate>

			<div className="grid grid-cols-4 lg:grid-cols-2 items-center mt-[60px] lg:mt-[30px] gap-x-5 gap-y-[34px] lg:gap-x-[10px] lg:gap-y-[20px]">
				{filteredEstablishments.map((establishment) => (
					<RecommendationCard
						key={establishment.id}
						establishment={establishment}
						establishmentImageContainer="max-w-[320px] max-h-[322px]"
						imageClassName="w-[320px] h-[322px]"
					/>
				))}
			</div>

			<div className="flex items-center justify-center">
				<Button
					variant={'yellow'}
					className="mt-[34px] rounded-[42px] px-[22px] py-[14px] h-[52px] flex items-center"
				>
					{recommendationViewModel.button}
					<GoArrowRight />
				</Button>
			</div>
		</div>
	);
};

export default Recommendation;
