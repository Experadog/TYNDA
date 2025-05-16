'use client';
import { FC } from 'react';

interface IProps {
    heroViewModel: ViewModel['Tariffs']['hero']
}

const Hero: FC<IProps> = ({ heroViewModel }) => {
    return (
        <div className='mt-[10px] lg:mt-0 max-w-[1420px] m-auto px-[10px] lg:px-0'>
            <div className='w-full h-[586px] lg:h-[403px] lg:px-5 flex flex-col justify-center items-center gap-7 rounded-[25px] mt-[20px] lg:m-0 lg:rounded-none bg-[linear-gradient(0deg,rgba(9,9,9,0.60)_0%,rgba(9,9,9,0.60)_100%),url("/tariffs/tariffsBg.webp")] lg:bg-[linear-gradient(0deg,rgba(9,9,9,0.50)_0%,rgba(9,9,9,0.50)_100%),url("/tariffs/tariffsBg.webp")] bg-cover bg-center bg-no-repeat'>
                <h2 className='uppercase text-white text-center text-5xl lg:text-3xl font-semibold lg:font-bold'>
                    {heroViewModel.title}
                </h2>
                <h3 className='text-lg font-normal text-center max-w-[634px] text-white lg:text-sm'>
                    {heroViewModel.description}
                </h3>
            </div>
        </div>
    );
};

export default Hero;
