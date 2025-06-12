'use client';

import { getTranslateByKey } from '@/lib';
import type { EstablishmentListItem } from '@business-entities';
import Image from 'next/image';
import ItemMenu from '../item-menu';

type Props = {
	item: EstablishmentListItem;
	locale: Locale;
	viewModel: ViewModel['Shared']['establishment_categories'];
	onDelete: (id: string) => void;
	isSuperUser: boolean;
};

const EstablishmentItem = ({ item, locale, viewModel, onDelete, isSuperUser }: Props) => {
	const { translates } = item;

	return (
		<div className="flex max-w-[320px] flex-col rounded-2xl  transition  border border-transparent duration-300  hover:border-light_gray hover:bg-background_1 group">
			<div className="relative w-full h-48 rounded-t-2xl rounded-b-2xl group-hover:rounded-b-none transition-[border-radius] duration-500 overflow-hidden">
				<Image
					priority
					alt={item.id}
					src={item.cover}
					sizes="100vw"
					fill
					className="object-cover transition-transform duration-500 group-hover:scale-110"
				/>

				<ItemMenu
					label={getTranslateByKey(locale, translates, 'name')}
					itemID={item.id}
					isSuperUser={isSuperUser}
					onDelete={onDelete}
				/>
			</div>

			<div className="flex flex-col gap-3 p-4">
				<div className="flex flex-col gap-1">
					<p className="font-semibold text-lg truncate leading-snug">
						{getTranslateByKey(locale, translates, 'name')}
					</p>
					<p className="font-medium text-sm text-foreground_2 truncate">
						{viewModel[item.category]}
					</p>
					<p className="font-normal text-sm numeric text-foreground_2">
						Скидка: <strong className="text-orange">{item.discount}%</strong>
					</p>
					<p className="text-shade_gray text-xs line-clamp-2 leading-snug">
						{getTranslateByKey(locale, translates, 'description')}
					</p>
				</div>
			</div>
		</div>
	);
};

export default EstablishmentItem;
