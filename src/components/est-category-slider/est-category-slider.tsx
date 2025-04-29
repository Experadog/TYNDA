import {
	ESTABLISHMENTS_CATEGORIES,
	type EstablishmentCategory,
} from '@/business-entities/establishment/EstablishmentEntity';
import { useMemo } from 'react';
import type { IconType } from 'react-icons/lib';
import {
	LuBaby,
	LuBath,
	LuBus,
	LuCalendar,
	LuCar,
	LuHotel,
	LuLandmark,
	LuMapPin,
	LuShoppingBag,
	LuUser,
	LuUtensils,
} from 'react-icons/lu';
import Slider from '../slider/slider';

const icons = [
	LuHotel,
	LuUtensils,
	LuCar,
	LuBath,
	LuShoppingBag,
	LuLandmark,
	LuCalendar,
	LuBaby,
	LuBus,
	LuMapPin,
	LuUser,
];

type Props = {
	viewModel: ViewModel['Shared']['establishment_categories'];
	slidesPerView: number;
	spacing: number;
	onSelect: (category: EstablishmentCategory) => void;
};

type CategoryType = {
	title: string;
	icon: IconType;
	value: EstablishmentCategory;
};

const EstCategorySlider = ({ viewModel, slidesPerView, spacing, onSelect }: Props) => {
	const categories: CategoryType[] = useMemo(() => {
		return Object.values(ESTABLISHMENTS_CATEGORIES).map((value, index) => ({
			title: viewModel[value],
			icon: icons[index],
			value,
		}));
	}, [viewModel]);

	return (
		<Slider
			loop
			slidesPerView={slidesPerView}
			spacing={spacing}
			classNameSlider="mt-[50px] lg:mt-[30px]"
		>
			{categories.map((item) => {
				const Icon = item.icon;

				return (
					<div
						key={item.value}
						className="flex flex-col items-center gap-5 lg:gap-[10px] group cursor-pointer pt-2"
						onClick={() => {
							onSelect(item.value);
						}}
					>
						<div className="p-[30px] lg:p-[23px] flex items-center justify-center bg-background_1 rounded-full shadow-[0_0_10px_1px_rgba(41,53,61,0.20)] transition-all duration-300 group-hover:bg-[var(--yellow)] active:bg-[var(--yellow)]">
							<Icon className="text-foreground_1 group-hover:text-white w-[34px] h-[34px] lg:w-5 lg:h-5" />
						</div>
						<p className="font-semibold text-base lg:text-xs lg:font-medium text-center lg:text-wrap group-hover:text-[var(--yellow)] active:text-[var(--yellow)]">
							{item.title}
						</p>
					</div>
				);
			})}
		</Slider>
	);
};

export default EstCategorySlider;
