import type { EstablishmentListItem } from '@/business-entities/establishment/EstablishmentEntity';
import { Link } from '@/i18n/routing';
import { PAGES, getTranslateByKey } from '@/lib';
import { useLocale } from '@/providers/locale/locale-provider';
import { Button } from '@components';
import Image from 'next/image';
import type { FC } from 'react';

interface IProps {
	establishment: EstablishmentListItem;
}

const RecommendationCard: FC<IProps> = ({ establishment }) => {
	const { locale } = useLocale();

	return (
		<Link href={`${PAGES.ENTERPRISES_ALL}/${establishment.id}`}>
			<div className="w-[320px] max-w-[320px] h-[478px] lg:w-[171px] lg:h-[320px] flex flex-col gap-[19px] lg:gap-2 lg:pb-2 pb-[14px] shadow-sm rounded-[20px] bg-background_1 cursor-pointer border border-light_gray">
				<div className="max-h-[322px] max-w-[320px] lg:max-w-[171px] lg:max-h-[171px] w-full">
					<Image
						src={establishment?.cover || '/other/cardImg.webp'}
						alt="establishment image"
						width={320}
						priority
						height={322}
						className="rounded-b-2xl rounded-t-[20px] w-full h-[322px] lg:h-[171px] object-cover object-center"
					/>
				</div>
				<div className="px-[14px] md:px-2 h-full flex flex-col justify-between">
					<div className="">
						<h4 className="font-semibold text-lg uppercase md:text-sm md:font-medium line-clamp-2 numeric">
							{getTranslateByKey(locale, establishment.translates, 'name')}
						</h4>
						<p className="font-normal text-gray text-sm line-clamp-2 md:text-xs numeric">
							{getTranslateByKey(locale, establishment.translates, 'description')}
						</p>
					</div>
					<div className="flex justify-between">
						<Button
							clickable={'nonClickable'}
							variant={'yellow'}
							className="rounded-2xl text-base font-semibold md:text-xs numeric"
						>
							{establishment?.average_bill} c
						</Button>
						{/* 
						<div className={'flex gap-1 items-center'}>
							<p className="numeric text-base font-semibold md:text-xs">0</p>
							<IoStar className="text-[var(--yellow)] md:text-sm" />
						</div> */}
					</div>
				</div>
			</div>
		</Link>
	);
};

export default RecommendationCard;
