'use client';
import { BreadCrumbs } from '@/components/ui/breadCrumbs';
import { FC } from 'react';

interface IProps { }

const Hero: FC<IProps> = ({ }) => {
    return (
        <div className='mt-[50px] lg:mt-0 max-w-[1340px] m-auto px-14 lg:px-0'>
            <BreadCrumbs home={'Главная'} pageName={'Контакты'} />
            <div className='w-full h-[280px] lg:px-5 flex flex-col justify-center items-center gap-7 rounded-[25px] mt-[20px] lg:m-0 lg:rounded-none bg-[linear-gradient(0deg,rgba(9,9,9,0.60)_0%,rgba(9,9,9,0.60)_100%),url("/enterprisesBg.webp")] lg:bg-[linear-gradient(0deg,rgba(9,9,9,0.50)_0%,rgba(9,9,9,0.50)_100%),url("/enterprisesBg.webp")] bg-cover bg-center bg-no-repeat'>
                <h2 className='uppercase text-white text-center text-6xl lg:text-3xl font-semibold lg:font-bold'>Контакты</h2>
            </div>
        </div>
    );
};

export default Hero;
