import type { EstablishmentListItem } from '@/business-entities/establishment/EstablishmentEntity';
import { Link } from '@/i18n/routing';
import { PAGES, getTranslateByKey } from '@/lib';
import { useLocale } from '@/providers/locale/locale-provider';
import { Button } from '@components';
import Image from 'next/image';
import type { FC } from 'react';

interface IProps {
	establishment: EstablishmentListItem;
	imageClassName?: string;
	imageContainer?: string;
	mainClassName?: string;
	descriptionClassName?: string;
}

const MoreRecsCard: FC<IProps> = ({
	establishment,
	imageClassName = '',
	imageContainer = '',
	mainClassName = '',
	descriptionClassName = 'line-clamp-1',
}) => {
	const { locale } = useLocale();

	return (
		<Link href={`${PAGES.ENTERPRISES_ALL}/${establishment.id}`}>
			<div
				className={`flex flex-col gap-[14px] lg:gap-2 lg:pb-2 pb-[14px] shadow-md rounded-[20px] bg-background_1 cursor-pointer border border-light_gray ${mainClassName}`}
			>
				<div className={`${imageContainer}`}>
					<Image
						src={establishment?.cover || '/other/cardImg.webp'}
						alt="establishment image"
						width={650}
						priority
						height={559}
						className={`rounded-[10px] rounded-t-[20px] w-full object-cover ${imageClassName}`}
					/>
				</div>
				<div className="px-[14px] lg:px-1 flex flex-col justify-between h-full">
					<div className="flex flex-col gap-[10px]">
						<h4 className="font-semibold text-lg uppercase lg:text-base lg:font-medium line-clamp-1 numeric">
							{getTranslateByKey(locale, establishment.translates, 'name')}
						</h4>
						<p
							className={`font-normal text-gray text-sm lg:text-xs numeric ${descriptionClassName}`}
						>
							{getTranslateByKey(locale, establishment.translates, 'description')}
						</p>
					</div>
					<div className="flex justify-between mt-[18px] lg:mt-3">
						<Button
							variant={'yellow'}
							className="rounded-[18px] text-base font-semibold lg:text-sm numeric"
						>
							{establishment?.average_bill} c
						</Button>
						{/* <div className={'flex gap-1 items-center'}>
							<p className="numeric text-base font-semibold lg:text-sm">0</p>
							<IoStar className="text-[var(--yellow)] lg:text-sm" />
						</div> */}
					</div>
				</div>
			</div>
		</Link>
	);
};

export default MoreRecsCard;
