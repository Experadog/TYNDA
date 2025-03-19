'use client';
import { Translate } from '@components';
import Image from 'next/image';
import { FC } from 'react';
import { useHomeUseCase } from '../use-cases/useHomeUseCase';

interface IProps {
    viewModel: ViewModel['Home']['about'];
}

const About: FC<IProps> = ({}) => {
    const { viewModel } = useHomeUseCase();
    return (
        <div className='mt-[120px] flex flex-col gap-[60px] mb-[200px]'>
            <div className='flex justify-between'>
                <Translate
                    direction='right'
                    distance={100}
                    animateOnce={false}
                >
                    <div className='flex flex-col gap-[20px]'>
                        <h3 className='uppercase font-semibold text-lg opacity-70'>{viewModel.about.title}</h3>
                        <h2 className='uppercase font-medium text-[34px] max-w-[734px]'>
                            {viewModel.about.title1} <span className='text-[var(--yellow)]'>{viewModel.about.title2} </span>
                            {viewModel.about.title3} <span className='text-[var(--yellow)]'>{viewModel.about.title4}</span>
                        </h2>
                        <p className='text-lg opacity-80 font-normal max-w-[510px] mt-[20px]'>{viewModel.about.description1}</p>
                        <p className='text-lg opacity-80 font-normal max-w-[510px]'>{viewModel.about.description2}</p>
                    </div>
                </Translate>
                <Translate
                    direction='left'
                    distance={100}
                    animateOnce={false}
                >
                    <div className='flex gap-[20px]'>
                        <Image
                            src={'/nature.webp'}
                            alt='nature'
                            width={318}
                            height={398}
                            className='rounded-2xl'
                        />
                        <Image
                            src={'/nature.webp'}
                            alt='nature'
                            width={228}
                            height={258}
                            className='h-[258px] rounded-2xl'
                        />
                    </div>
                </Translate>
            </div>

            <Translate
                direction='down'
                distance={50}
                animateOnce={false}
            >
                <div className='flex justify-between gap-3'>
                    <Image
                        src={'/nature.webp'}
                        alt='nature'
                        width={545}
                        height={258}
                        className='h-[258px] rounded-2xl'
                    />
                    <div className='grid grid-cols-3 items-center justify-between gap-4'>
                        <div className='flex flex-col gap-[10px]'>
                            <p className='font-bold text-6xl uppercase text-[var(--yellow)]'>24/7</p>
                            <p className='font-normal text-base max-w-[150px]'>{viewModel.about.stats1}</p>
                        </div>
                        <div className='flex flex-col gap-[10px]'>
                            <p className='font-bold text-6xl uppercase text-[var(--yellow)]'>50+</p>
                            <p className='font-normal text-base max-w-[110px]'>{viewModel.about.stats2}</p>
                        </div>
                        <div className='flex flex-col gap-[10px]'>
                            <p className='font-bold text-6xl uppercase text-[var(--yellow)]'>3 500+</p>
                            <p className='font-normal text-base max-w-[200px]'>{viewModel.about.stats3}</p>
                        </div>
                    </div>
                </div>
            </Translate>
        </div>
    );
};

export default About;
