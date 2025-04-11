import { Button } from '@components';
import Image from 'next/image';
import { FC } from 'react';
import { IoStar } from 'react-icons/io5';

interface IProps {
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
}

const RecommendationCard: FC<IProps> = ({
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
}) => {
    return (
        <div
            className={`flex flex-col gap-[14px] md:gap-2 md:pb-2 pb-[14px] shadow-md rounded-[20px] bg-background_1 ${className}`}
        >
            {!hideImage && (
                <div>
                    <Image
                        src={'/other/cardImg.webp'}
                        alt=''
                        width={imageWidth}
                        height={imageHeight}
                        className={`rounded-[10px] rounded-t-[20px] w-full ${imageClassName}`}
                    />
                </div>
            )}
            <div className={`px-[14px] md:px-1 ${bottomElClassName}`}>
                <h4
                    className={`font-semibold text-lg uppercase md:text-base md:font-medium ${titleClassName}`}
                >
                    Обзорная экскурсия по городу
                </h4>
                {!hideDescription && (
                    <p
                        className={`font-normal text-sm line-clamp-2 md:text-xs ${descriptionClassName}`}
                    >
                        Это первый в Кыргызстане этно-фастфуд, который был запущен в 2019 году.
                        Уютное заведение в центре города, где можно угостить гостей национальными
                        кыргызскими блюдами.
                    </p>
                )}
                <div className={`flex justify-between mt-[18px] md:mt-3 ${ratingClassName}`}>
                    {!hideButton && (
                        <Button
                            variant={'yellow'}
                            className={`rounded-[18px] text-base font-semibold md:text-sm numeric  ${buttonClassName}`}
                        >
                            2 356 c
                        </Button>
                    )}
                    {!hideRating && (
                        <div className={`flex gap-1 items-center`}>
                            <p className='numeric text-base font-semibold md:text-sm'>4.9</p>
                            <IoStar className='text-[var(--yellow)] md:text-sm' />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecommendationCard;
