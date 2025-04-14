'use client';
import Image from 'next/image';
import { FC } from 'react';

interface IProps {}

const Address: FC<IProps> = ({}) => {
    return (
        <div className='mt-[100px] lg:mt-[60px] flex flex-col items-center gap-12 lg:gap-7'>
            <div className='flex flex-col items-center justify-center gap-5'>
                <h3 className='uppercase text-lg lg:text-base font-semibold '>наш адрес</h3>
                <p className='text-4xl lg:text-2xl'>Мы на карте</p>
            </div>
            <div className='rounded-[25px] max-w-[957px] min-h-[445px] lg:max-w-[353px]'>
                <Image
                    src='/map.webp'
                    alt='map'
                    width={957}
                    height={445}
                    className='rounded-[25px] w-full h-full'
                />
            </div>
        </div>
    );
};

export default Address;
