import type { EstablishmentListItem } from '@/business-entities/establishment/EstablishmentEntity';
import { Link } from '@/i18n/routing';
import { PAGES, getTranslateByKey } from '@/lib';
import { useLocale } from '@/providers/locale/locale-provider';
import { Button } from '@components';
import Image from 'next/image';
import type { FC } from 'react';

interface IProps {
	establishment: EstablishmentListItem;
	mainClassName?: string;
}

const MoreRecsCard: FC<IProps> = ({ establishment, mainClassName = '' }) => {
	const { locale } = useLocale();

	return (
		<Link href={`${PAGES.ENTERPRISES_ALL}/${establishment.id}`}>
			<div
				className={`relative hover:-translate-y-3 duration-300 border border-shade_gray  cursor-pointer rounded-[20px] overflow-hidden shadow-md ${mainClassName}`}
			>
				<Image
					src={establishment?.cover}
					alt="establishment image"
					fill
					priority
					className="object-cover"
				/>

				<div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-black via-black/80 to-transparent" />

				<div className="absolute bottom-0 left-0 right-0 px-4 pb-4 text-white font-roboto">
					<h4 className="font-semibold text-lg uppercase  truncate numeric">
						{getTranslateByKey(locale, establishment.translates, 'name')}
					</h4>
					<p className="font-normal text-sm numeric line-clamp-2">
						{getTranslateByKey(locale, establishment.translates, 'description')}
					</p>
					<div className="mt-3">
						<Button className="rounded-[18px]  text-yellow bg-transparent text-base font-semibold numeric pointer-events-none p-0">
							{establishment?.average_bill} c
						</Button>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default MoreRecsCard;
