import type { EstablishmentListItem } from '@/business-entities/establishment/EstablishmentEntity';
import { useRouter } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { Button } from '@components';
import Image from 'next/image';
import type { FC } from 'react';
import { IoStar } from 'react-icons/io5';

interface IProps {
	establishment: EstablishmentListItem;
	className?: string;
	bottomElClassName?: string;
	titleClassName?: string;
	descriptionClassName?: string;
	buttonClassName?: string;
	ratingClassName?: string;
	imageClassName?: string;
	hideImage?: boolean;
	hideDescription?: boolean;
	hideButton?: boolean;
	hideRating?: boolean;
	imageWidth?: number;
	imageHeight?: number;
	establishmentImageContainer?: string;
}

const RecommendationCard: FC<IProps> = ({
	establishment,
	className = '',
	bottomElClassName = '',
	titleClassName = '',
	descriptionClassName = '',
	buttonClassName = '',
	ratingClassName = '',
	imageClassName = '',
	hideImage = false,
	hideDescription = false,
	hideButton = false,
	hideRating = false,
	imageWidth = 320,
	imageHeight = 322,
	establishmentImageContainer = '',
}) => {
	const router = useRouter();

	const detailEstablishmentNavigate = () => {
		router.push(`${PAGES.ENTERPRISES_ALL}/${establishment.id}`);
	};

	return (
		<div
			onClick={detailEstablishmentNavigate}
			className={`flex flex-col gap-[14px] md:gap-2 md:pb-2 pb-[14px] shadow-md rounded-[20px] bg-background_1 cursor-pointer ${className}`}
		>
			{!hideImage && (
				<div className={`${establishmentImageContainer}`}>
					<Image
						src={establishment?.cover || '/other/cardImg.webp'}
						alt="establishment image"
						width={imageWidth}
						priority
						height={imageHeight}
						className={`rounded-[10px] rounded-t-[20px] w-full object-cover object-center ${imageClassName}`}
					/>
				</div>
			)}
			<div className={`px-[14px] md:px-1 ${bottomElClassName}`}>
				<h4
					className={`font-semibold text-lg uppercase md:text-base md:font-medium ${titleClassName}`}
				>
					{establishment.translates?.ru?.name}
				</h4>
				{!hideDescription && (
					<p
						className={`font-normal text-sm line-clamp-2 md:text-xs ${descriptionClassName}`}
					>
						{establishment.translates?.ru?.description}
					</p>
				)}
				<div className={`flex justify-between mt-[18px] md:mt-3 ${ratingClassName}`}>
					{!hideButton && (
						<Button
							variant={'yellow'}
							className={`rounded-[18px] text-base font-semibold md:text-sm numeric  ${buttonClassName}`}
						>
							{establishment?.average_bill} c
						</Button>
					)}
					{!hideRating && (
						<div className={'flex gap-1 items-center'}>
							<p className="numeric text-base font-semibold md:text-sm">0</p>
							<IoStar className="text-[var(--yellow)] md:text-sm" />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default RecommendationCard;
