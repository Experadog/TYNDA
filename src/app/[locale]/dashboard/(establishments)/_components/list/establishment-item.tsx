'use client';

import { Link } from '@/i18n/routing';
import { PAGES, getTranslateByKey } from '@/lib';
import type { EstablishmentListItem } from '@business-entities';
import { Button } from '@components';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import { IoSettingsOutline } from 'react-icons/io5';

type Props = {
	item: EstablishmentListItem;
	locale: Locale;
	viewModel: ViewModel['Shared']['establishment_categories'];
	onDelete: (id: string) => void;
};

const EstablishmentItem = ({ item, locale, viewModel, onDelete }: Props) => {
	const { translates } = item;

	const handleDelete = async () => {
		onDelete(item.id);
	};

	return (
		<div className="flex flex-col gap-4 bg-background_1 rounded-xl border border-light_gray w-72">
			<div className="w-full h-48 relative">
				<Image
					priority
					alt={item.id}
					src={item.cover}
					sizes="100vw"
					fill
					className="rounded-t-xl border-b border-b-light_gray object-cover"
				/>
			</div>

			<div className="flex flex-col gap-3 p-3">
				<div className="flex flex-col gap-1">
					<p className="font-semibold text-lg truncate">
						{getTranslateByKey(locale, translates, 'name')}
					</p>
					<div className="flex items-center gap-2">
						<p className="font-semibold text-sm">{viewModel[item.category]},</p>
						<p className="font-normal text-sm numeric">Скидка: {item.discount}%</p>
					</div>
					<p className="text-shade_gray line-clamp-3 text-xs">
						{getTranslateByKey(locale, translates, 'description')}
					</p>

					<Link
						href={`${PAGES.ENTERPRISES_ALL}/${item.id}`}
						className="text-sm w-max  italic text-yellow hover:brightness-125 transition hover:underline"
					>
						Посмотреть детальнее
					</Link>
				</div>

				<div className="flex flex-wrap  items-stretch gap-2">
					<Button
						className="bg-error text-white shadow-none"
						size={'sm'}
						onClick={handleDelete}
						disableAnimation
					>
						<Trash />
					</Button>
					<Link
						href={`${PAGES.DASHBOARD}/${item.id}`}
						className="group flex items-center gap-1 rounded-md bg-yellow px-3 py-1.5 text-sm text-white transition hover:brightness-90"
					>
						<span>Изменить</span>
						<IoSettingsOutline
							size={20}
							className="transition-transform duration-300 group-hover:rotate-90"
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default EstablishmentItem;
