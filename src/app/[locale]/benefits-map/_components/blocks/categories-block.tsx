'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { CATEGORIES_ICONS } from '@/lib';
import { ESTABLISHMENTS_CATEGORIES, type EstablishmentCategory } from '@business-entities';
import { type UniversalListItem, useSetParams } from '@common';
import { Slider } from '@components';
import clsx from 'clsx';
import { useMemo } from 'react';

const CategoriesBlock = () => {
	const { establishment_categories } = useViewModel(['Shared']);
	const { getParam, setParam, removeParam } = useSetParams();

	const selectedCategory = useMemo(() => getParam('category') || null, [getParam]);

	const onSelectCategory = (selected: EstablishmentCategory) => {
		if (selectedCategory === selected) {
			removeParam('category');
		} else {
			setParam('category', selected);
		}
	};

	const categories: UniversalListItem<EstablishmentCategory>[] = useMemo(() => {
		return Object.values(ESTABLISHMENTS_CATEGORIES).map((value, index) => ({
			title: establishment_categories[value],
			icon: CATEGORIES_ICONS[index],
			value,
		}));
	}, [establishment_categories]);

	return (
		<Slider loop slidesPerView={5} spacing={5} navigation={false}>
			{categories.map((item) => {
				const Icon = item.icon;

				return (
					<div
						onClick={() => onSelectCategory(item.value)}
						key={item.value}
						className="flex flex-col gap-1 items-center group cursor-pointer"
					>
						<Icon
							className={clsx(
								'text-foreground_1 group-hover:text-yellow',
								selectedCategory === item.value && 'text-yellow',
							)}
							size={15}
						/>
						<p
							className={clsx(
								'text-foreground_1 text-xs text-center group-hover:text-yellow',
								selectedCategory === item.value && 'text-yellow',
							)}
						>
							{item.title}
						</p>
					</div>
				);
			})}
		</Slider>
	);
};

export default CategoriesBlock;
