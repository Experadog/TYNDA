import RatingStars from '@/components/ui/rating-stars';
import { UserReviews } from '@business-entities';
import { Translate } from '@components';
import Image from 'next/image';
import { FC } from 'react';

const RatingCard: FC<UserReviews> = (item) => {
    return (
        <Translate
            direction='up'
            animateOnce={false}
            distance={20}
        >
            <div
                className='flex flex-col gap-5 p-5 rounded-3xl bg-background_1 shadow-md overflow-hidden relative
				  border border-background_3 cursor-pointer hover:border-white hover:-translate-y-3 transition-transform'
            >
                <div className='flex flex-col gap-4'>
                    <div className='flex gap-3'>
                        <Image
                            alt={item.title}
                            src={item.image}
                            width={60}
                            height={60}
                            className='rounded-full'
                        />
                        <div className='flex flex-col gap-2'>
                            <p className='text-foreground_1 font-bold text-lg truncate'>{item.title}</p>
                            <p className='text-foreground_1 font-semibold text-sm truncate'>
                                {item.category}
                                <span className='text-foreground_1 font-normal text-sm ml-1'>{item.location}</span>
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-1'>
                        <RatingStars rating={item.rating} />
                        <p className='numeric text-base font-semibold text-foreground_1'>{item.rating}</p>
                    </div>
                </div>

                <p className='text-sm font-normal h-20 line-clamp-4'>{item.text}</p>

                <p className='text-sm text-foreground_2 font-normal numeric'>{item.date}</p>
            </div>
        </Translate>
    );
};

export default RatingCard;
