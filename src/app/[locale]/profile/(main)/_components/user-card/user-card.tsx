'use client';

import { TariffCard } from '@components';
import Image from 'next/image';
import { FC } from 'react';

interface IProps {}

const UserCard: FC<IProps> = ({}) => {
    return (
        <div className='bg-background_1 w-full max-w-[416px] rounded-3xl p-6 absolute -top-[230px] shadow-md'>
            <div className='relative flex flex-col w-full items-center'>
                <div className='flex items-center flex-col w-full'>
                    <Image
                        src={'/auth.webp'}
                        alt='user-avatar'
                        width={115}
                        height={115}
                        className='rounded-full absolute -top-11'
                    />
                </div>

                <div className='flex flex-col items-center mt-20'>
                    <h3 className='text-foreground_1 font-semibold text-xl'>Омуркулов Айдин</h3>
                    <div className='flex flex-col gap-1 mt-4 items-center'>
                        <h4 className='text-foreground_1 font-semibold text-sm  numeric'>+996 554 222 222</h4>
                        <h4 className='text-foreground_1 font-semibold text-sm  numeric'>omurkulovaidin94@gmail.com</h4>
                    </div>
                </div>

                <div className='flex flex-col gap-3 items-center w-full mt-5'>
                    <TariffCard
                        isActive={true}
                        data={{}}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserCard;
