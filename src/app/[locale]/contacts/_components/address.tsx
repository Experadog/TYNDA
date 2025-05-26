'use client';
import Image from 'next/image';
import { FC } from 'react';

interface IProps {
    address: ViewModel['Contacts']['address']
}

const Address: FC<IProps> = ({address}) => {
    return (
        <div className='mt-[100px] lg:mt-[60px] flex flex-col items-center gap-12 lg:gap-7'>
            <div className='flex flex-col items-center justify-center gap-5'>
                <h3 className='uppercase text-lg lg:text-base font-semibold '>{address.ourAddress}</h3>
                <p className='text-4xl lg:text-2xl'>{address.onMap}</p>
            </div>
            <div className='rounded-[25px] max-w-[957px] min-h-[445px] lg:max-w-[353px]'>
                <Image
                    priority
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
