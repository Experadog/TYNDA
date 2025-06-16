import type { ClientHistory } from '@business-entities';
import Image from 'next/image';
import type { FC } from 'react';
import { IoStar } from 'react-icons/io5';

const RecentlyVisitedCard: FC<ClientHistory> = (item) => {
	const {
		establishment: { address, category, cover, name },
	} = item;

	return (
		<div
			className="
    relative flex flex-col w-full rounded-xl overflow-hidden cursor-pointer
    border border-light_gray
    shadow-sm transition-shadow duration-300 ease-in-out group
  "
		>
			<div className="relative w-full h-40 sm:h-32">
				<Image
					src={cover}
					alt={name}
					fill
					style={{ objectFit: 'cover' }}
					onError={(event) => {
						event.currentTarget.src = '/other/placeholder.webp';
					}}
					priority
					className="group-hover:scale-110 transition-transform duration-500"
				/>
				<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
			</div>

			<div className="absolute bottom-0 left-0 right-0 p-4 text-white">
				<h3 className="text-lg font-semibold truncate">{name}</h3>
				<div className="flex flex-wrap gap-2 text-sm font-medium opacity-90">
					<span>{category}</span>
					<span className="opacity-70 truncate">{address}</span>
				</div>
				<div className="flex items-center gap-3 pt-2 text-yellow-400">
					<IoStar size={18} />
					<span className="font-semibold numeric">0</span>
					<div className="bg-white w-1 h-1 rounded-full opacity-70" />
					<span className="text-sm font-normal numeric opacity-80">{0} отзывов</span>
				</div>
			</div>
		</div>
	);
};

export default RecentlyVisitedCard;
