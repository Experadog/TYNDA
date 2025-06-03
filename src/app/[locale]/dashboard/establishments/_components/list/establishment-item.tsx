'use client';

import { Link } from '@/i18n/routing';
import { PAGES, getTranslateByKey } from '@/lib';
import type { EstablishmentListItem } from '@business-entities';
import { Button } from '@components';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import { IoChatbubbleEllipsesOutline, IoSettingsOutline } from 'react-icons/io5';
import { LiaUsersCogSolid } from 'react-icons/lia';

type Props = {
	item: EstablishmentListItem;
	locale: Locale;
	viewModel: ViewModel['Shared']['establishment_categories'];
	onDelete: (id: string) => void;
	isSuperUser: boolean;
};

const EstablishmentItem = ({ item, locale, viewModel, onDelete, isSuperUser }: Props) => {
	const { translates } = item;

	const handleDelete = async () => {
		onDelete(item.id);
	};

	return (
		<div className="flex max-w-[280px] flex-col gap-4 bg-background_1 rounded-xl border border-light_gray">
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
						<p className="font-semibold text-sm truncate">{viewModel[item.category]}</p>
					</div>
					<p className="font-normal text-sm numeric">
						Скидка: <strong className="text-orange">{item.discount}%</strong>
					</p>
					<p className="text-shade_gray line-clamp-1 text-xs">
						{getTranslateByKey(locale, translates, 'description')}
					</p>
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
						href={`${PAGES.ESTABLISHMENT}/${item.id}/${PAGES.STAFF}`}
						className={clsx(
							'group flex items-center gap-1 rounded-md bg-yellow px-3 py-1.5 text-sm text-white transition hover:brightness-90',
							isSuperUser && 'opacity-70 pointer-events-none',
						)}
					>
						<LiaUsersCogSolid
							size={20}
							className="transition-transform duration-300 group-hover:rotate-45"
						/>
					</Link>

					<Link
						href={`${PAGES.ESTABLISHMENT}/${item.id}`}
						className="group flex items-center gap-1 rounded-md bg-yellow px-3 py-1.5 text-sm text-white transition hover:brightness-90"
					>
						<IoSettingsOutline
							size={20}
							className="transition-transform duration-300 group-hover:rotate-45"
						/>
					</Link>

					<Link
						href={`${PAGES.ESTABLISHMENT}/${item.id}/${PAGES.ESTABLISHMENT_CHAT}`}
						className="group flex items-center gap-1 rounded-md bg-orange px-3 py-1.5 text-sm text-white transition hover:brightness-90"
					>
						<IoChatbubbleEllipsesOutline
							size={20}
							className="transition-transform duration-300 group-hover:rotate-45"
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default EstablishmentItem;
