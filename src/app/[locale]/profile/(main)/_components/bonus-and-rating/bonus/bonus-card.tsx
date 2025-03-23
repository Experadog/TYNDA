import { BonusHistory } from '@business-entities';
import { Translate } from '@components';
import Image from 'next/image';
import { FC } from 'react';
import { CiDiscount1 } from 'react-icons/ci';

const BonusCard: FC<BonusHistory> = (item) => {
    return (
        <Translate
            direction='up'
            animateOnce={false}
            distance={20}
        >
            <div
                className='flex flex-col p-3 rounded-3xl bg-background_1 shadow-md overflow-hidden relative
				  border border-background_3 cursor-pointer hover:border-white hover:-translate-y-3 transition-transform
				  '
            >
                <div className='w-full h-32 relative'>
                    <Image
                        src={item.image}
                        alt={item.title}
                        layout='fill'
                        objectFit='cover'
                        priority
                        className='rounded-2xl'
                    />
                </div>

                <div className='flex flex-col gap-1 p-3'>
                    <p className='text-foreground_1 font-bold text-lg truncate'>{item.title}</p>
                    <p className='text-foreground_1 font-semibold text-sm truncate'>
                        {item.category}
                        <span className='text-foreground_1 font-normal text-sm ml-1'>{item.location}</span>
                    </p>

                    <div className='flex items-center gap-2 px-1'>
                        <p className='text-foreground_2 font-semibold text-sm truncate numeric'>{item.date}</p>
                    </div>
                </div>

                <div
                    className='absolute bottom-0 right-0 p-2 font-bold text-sm flex items-center gap-1 
                bg-gradient-to-r from-yellow to-orange-400 text-white 
                rounded-tl-3xl'
                >
                    <CiDiscount1 />
                    {item.discount} %
                </div>
            </div>
        </Translate>
    );
};

export default BonusCard;
