'use client';
import Image from 'next/image';
import { FC } from 'react';

interface IProps {}

const FirstService: FC<IProps> = ({}) => {
    return (
        <div className='mt-[155px] mb-[100px] lg:mb-[60px] lg:px-5 max-w-[1158px] m-auto rounded-[35px] bg-background_1 [box-shadow:0px_0px_15px_2px_rgba(41,53,61,0.2)] px-[116px] lg:shadow-none lg:rounded-none'>
            <div className='grid grid-cols-2 lg:grid-cols-1 items-center gap-[130px] lg:gap-[50px]'>
                <div className='flex flex-col gap-[60px]'>
                    <div className='flex items-center gap-5'>
                        <Image
                            src={'/logo.svg'}
                            alt='logo'
                            width={69}
                            height={66}
                        />
                        <p className='text-yellow text-6xl font-bold uppercase'>S-CLUB</p>
                    </div>
                    <div className='flex flex-col gap-[40px]'>
                        <p className='text-base font-semibold text-foreground_1'>
                            S-CLUB – первый сервис такого <br /> уровня в Кыргызстане!
                        </p>
                        <p className='text-base font-semibold text-foreground_1'>
                            Подключитесь сегодня и <br /> путешествуйте комфортно и выгодно!
                        </p>
                    </div>
                </div>
                <div className=''>
                    <Image
                        src={'/tariffs/earth2.png'}
                        alt='earth'
                        width={451}
                        height={444}
                        className='w-full'
                    />
                </div>
            </div>
        </div>
    );
};

export default FirstService;
