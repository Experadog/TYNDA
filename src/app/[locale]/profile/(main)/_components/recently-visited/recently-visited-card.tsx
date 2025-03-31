import { URL_ENTITIES } from '@/lib';
import { ClientHistory } from '@business-entities';
import { revalidateByTags } from '@common';
import Image from 'next/image';
import { FC } from 'react';
import { IoStar } from 'react-icons/io5';

const RecentlyVisitedCard: FC<ClientHistory> = (item) => {
    const {
        establishment: { address, category, cover, name },
    } = item;

    return (
        <div
            onClick={() => revalidateByTags([URL_ENTITIES.CARD_HISTORY])}
            className='flex flex-col w-full shadow-md rounded-xl overflow-hidden gap-3 border border-background_3 cursor-pointer hover:border-white  hover:-translate-y-3 transition-transform flex-shrink-0 relative'
        >
            <div className='w-full h-32 relative'>
                <Image
                    src={cover}
                    alt={name}
                    unoptimized
                    fill
                    style={{ objectFit: 'cover' }}
                    onError={(event) => {
                        event.currentTarget.src = '/placeholder.webp';
                    }}
                    priority
                />
            </div>

            <div className='flex flex-col gap-1 p-3'>
                <span className='text-foreground_1 font-semibold text-lg truncate'>{name}</span>
                <span className='text-foreground_1 font-semibold text-base truncate'>
                    {category}
                    <span className='text-foreground_1 font-normal text-base ml-3'>{address}</span>
                </span>
                <div className='flex items-center gap-2 px-1'>
                    <span className='flex items-center gap-1'>
                        <IoStar
                            color='var(--yellow)'
                            size={20}
                        />
                        <span className='text-sm font-semibold numeric'>{0}</span>
                    </span>
                    <div className='bg-foreground_1 size-1 rounded-full' />
                    <span className='text-sm font-normal numeric'>{0} отзывов</span>
                </div>
            </div>
        </div>
    );
};

export default RecentlyVisitedCard;
