import { Translate } from '@components';
import Image from 'next/image';
import { FC } from 'react';
import { IoStar } from 'react-icons/io5';

interface IProps {
    image: string;
    title: string;
    category: string;
    location: string;
    rating: number;
    review_count: number;
}

const RecentlyVisitedCard: FC<IProps> = ({ image, title, category, location, rating, review_count }) => {
    return (
        <Translate
            direction='up'
            distance={150}
            animateOnce={false}
        >
            <div className='flex flex-col w-full shadow-md rounded-xl overflow-hidden gap-3 border border-background_3 cursor-pointer hover:border-white  hover:-translate-y-3 transition-transform flex-shrink-0 relative'>
                <div className='w-full h-32 relative'>
                    <Image
                        src={image}
                        alt={title}
                        layout='fill'
                        objectFit='cover'
                        priority
                    />
                </div>

                <div className='flex flex-col gap-1 p-3'>
                    <span className='text-foreground_1 font-semibold text-lg truncate'>{title}</span>
                    <span className='text-foreground_1 font-semibold text-base truncate'>
                        {category}
                        <span className='text-foreground_1 font-normal text-base ml-3'>{location}</span>
                    </span>
                    <div className='flex items-center gap-2 px-1'>
                        <span className='flex items-center gap-1'>
                            <IoStar
                                color='var(--yellow)'
                                size={20}
                            />
                            <span className='text-sm font-semibold numeric'>{rating}</span>
                        </span>
                        <div className='bg-foreground_1 size-1 rounded-full' />
                        <span className='text-sm font-normal numeric'>{review_count} отзывов</span>
                    </div>
                </div>
            </div>
        </Translate>
    );
};

export default RecentlyVisitedCard;
