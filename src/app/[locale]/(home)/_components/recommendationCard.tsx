import type { EstablishmentListItem } from '@/business-entities/establishment/EstablishmentEntity';
import { Link } from '@/i18n/routing';
import { PAGES, getTranslateByKey, priceFormatter } from '@/lib';
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
		<Link
			href={`${PAGES.ENTERPRISES_ALL}/${establishment.id}`}
			className="
					w-full
                    cursor-pointer
                    border border-transparent rounded-[15px] overflow-hidden
                    transition-all duration-300  hover:shadow-md
                    sm:flex sm:flex-col 

                    lg:flex lg:flex-row lg:h-[140px] 

					hover:-translate-y-2 lg:hover:translate-y-0
                "
		>
			<div
				className="
                        relative
                        w-full h-[160px] 
                        sm:h-auto 

                        lg:w-[40%] lg:h-full
                    "
			>
				<Image
					src={establishment?.cover}
					alt="establishment image"
					fill
					priority
					className="object-cover object-center"
				/>
			</div>

			<div
				className="
                        flex flex-col justify-between
                        px-4 py-3 md:px-3 md:py-2 grow
                        lg:w-[60%] lg:h-full lg:py-2 lg:px-3
                    "
			>
				<div className="flex flex-col gap-2 flex-grow">
					<h4 className="font-semibold text-lg md:text-base lg:text-sm uppercase truncate numeric min-h-[2.8em] md:min-h-[2.6em] lg:min-h-[auto] font-roboto">
						{getTranslateByKey(locale, establishment.translates, 'name')}
					</h4>
					<p className="font-normal text-gray text-sm md:text-xs line-clamp-2 numeric h-[2.8em] md:h-[2.4em] lg:h-[auto] overflow-hidden font-roboto">
						{getTranslateByKey(locale, establishment.translates, 'description')}
					</p>
				</div>

				<div className="pt-2 md:pt-1.5">
					<Button
						clickable="nonClickable"
						className="text-base md:text-sm lg:text-xs font-bold py-1.5 md:py-1 lg:py-0.5 numeric w-max  text-yellow bg-transparent shadow-none mr-auto p-0"
					>
						{priceFormatter(establishment?.average_bill, 'с')}
					</Button>
				</div>
			</div>
		</Link>
	);
};

export default RecommendationCard;
