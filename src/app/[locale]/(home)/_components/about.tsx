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
        <div className='mt-[120px] lg:mt-[60px] px-5 flex flex-col gap-[60px] lg:gap-[30px] mb-[200px] lg:mb-[60px]'>
            <div className='flex justify-between lg:flex-col lg:px-5 lg:gap-[30px] lg:items-center lg:justify-center'>
                <Translate
                    direction='right'
                    distance={100}
                    animateOnce={false}
                >
                    <div className='flex flex-col gap-[20px] lg:items-center lg:justify-center'>
                        <h3 className='uppercase font-semibold text-lg opacity-70'>{viewModel.about.title}</h3>
                        <h2 className='uppercase font-medium text-[34px] max-w-[734px] lg:text-center'>
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
                            className='rounded-2xl lg:w-[355px]'
                        />
                        <Image
                            src={'/nature.webp'}
                            alt='nature'
                            width={228}
                            height={258}
                            className='h-[258px] rounded-2xl lg:hidden'
                        />
                    </div>
                </Translate>
            </div>

            <Translate
                direction='down'
                distance={50}
                animateOnce={false}
            >
                <div className='flex justify-between gap-5 lg:flex-col-reverse md:justify-center md:items-center'>
                    <div className='flex items-center justify-center'>
                        <Image
                            src={'/nature.webp'}
                            alt='nature'
                            width={545}
                            height={258}
                            className='h-[258px] rounded-2xl lg:w-[355px]'
                        />
                    </div>
                    <div className='flex flex-wrap items-center justify-center gap-4'>
                        <div className='flex flex-col gap-[10px]'>
                            <p className='font-bold text-6xl uppercase text-yellow numeric'>24/7</p>
                            <p className='font-normal text-base'>{viewModel.about.stats1}</p>
                        </div>
                        <div className='flex flex-col gap-[10px]'>
                            <p className='font-bold text-6xl uppercase text-yellow numeric'>50+</p>
                            <p className='font-normal text-base'>{viewModel.about.stats2}</p>
                        </div>
                        <div className='flex flex-col gap-[10px]'>
                            <p className='font-bold text-6xl uppercase text-yellow numeric'>3500+</p>
                            <p className='font-normal text-base'>{viewModel.about.stats3}</p>
                        </div>
                    </div>
                </div>
            </Translate>
        </div>
    );
};

export default About;
