import {
	ESTABLISHMENTS_CATEGORIES,
	type EstablishmentCategory,
} from '@/business-entities/establishment/EstablishmentEntity';
import { useMemo } from 'react';
import type { IconType } from 'react-icons/lib';
import {
	LuBaby,
	LuBadgePercent,
	LuBus,
	LuCake,
	LuCalendar,
	LuChevronLeft,
	LuChevronRight,
	LuHeartPulse,
	LuHouse,
	LuKeyRound,
	LuLandmark,
	LuMap,
	LuMapPinned,
	LuMountain,
	LuRoute,
	LuShoppingBag,
	LuUtensils,
} from 'react-icons/lu';
import Slider from '../slider/slider';

const icons = [
	LuHouse,
	LuUtensils,
	LuKeyRound,
	LuHeartPulse,
	LuShoppingBag,
	LuLandmark,
	LuCalendar,
	LuBaby,
	LuMountain,
	LuBadgePercent,
	LuCake,
	LuMap,
	LuBus,
	LuMapPinned,
	LuRoute,
];

type Props = {
	viewModel: ViewModel['Shared']['establishment_categories'];
	slidesPerView: number;
	spacing: number;
	onSelect: (category: EstablishmentCategory) => void;
	selectedCategory: EstablishmentCategory | null;
};

type CategoryType = {
	title: string;
	icon: IconType;
	value: EstablishmentCategory;
};

const EstCategorySlider = ({
	viewModel,
	slidesPerView,
	spacing,
	onSelect,
	selectedCategory,
}: Props) => {
	const categories: CategoryType[] = useMemo(() => {
		return Object.values(ESTABLISHMENTS_CATEGORIES).map((value, index) => ({
			title: viewModel[value],
			icon: icons[index],
			value,
		}));
	}, [viewModel]);

	return (
		<div className="relative mb-7">
			<Slider
				loop
				slidesPerView={slidesPerView}
				spacing={spacing}
				classNameSlider="mt-[50px] lg:mt-[30px]"
				navigation={{
					nextEl: '.category-slider-next',
					prevEl: '.category-slider-prev',
				}}
			>
				{categories.map((item) => {
					const Icon = item.icon;
					const isSelected = item.value === selectedCategory;

					return (
						<div
							key={item.value}
							className="flex flex-col items-center gap-5 lg:gap-[10px] group cursor-pointer pt-2"
							onClick={() => onSelect(item.value)}
						>
							<div
								className={`p-[30px] lg:p-[23px] flex items-center justify-center rounded-full shadow-[0_0_10px_1px_rgba(41,53,61,0.20)] transition-all duration-300 
					${isSelected ? 'bg-[var(--yellow)]' : 'bg-background_1 group-hover:bg-[var(--yellow)] active:bg-[var(--yellow)]'}`}
							>
								<Icon
									className={`w-[34px] h-[34px] lg:w-5 lg:h-5 transition-colors 
						${isSelected ? 'text-white' : 'text-foreground_1 group-hover:text-white'}`}
								/>
							</div>
							<p
								className={`font-semibold text-base lg:text-xs lg:font-medium text-center lg:text-wrap transition-colors 
					${isSelected ? 'text-[var(--yellow)]' : 'text-foreground_1 group-hover:text-[var(--yellow)] active:text-[var(--yellow)]'}`}
							>
								{item.title}
							</p>
						</div>
					);
				})}
			</Slider>
			<button
				type="button"
				className="category-slider-prev absolute left-0 lg:left-[-10px] top-[40%] -translate-y-1/2 z-10"
				aria-label="Previous"
			>
				<LuChevronLeft className="w-6 h-6 text-gray-600" />
			</button>
			<button
				type="button"
				className="category-slider-next absolute right-0 lg:right-[-10px] top-[40%] -translate-y-1/2 z-10"
				aria-label="Next"
			>
				<LuChevronRight className="w-6 h-6 text-gray-600" />
			</button>
		</div>
	);
};

export default EstCategorySlider;
