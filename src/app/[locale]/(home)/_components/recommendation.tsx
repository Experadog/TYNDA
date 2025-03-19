'use client';

import { Button, Slider, Translate } from '@components';
import { FC } from 'react';
import { BsPassport } from 'react-icons/bs';
import { GoArrowRight, GoGift } from 'react-icons/go';
import { IoGameControllerOutline } from 'react-icons/io5';
import { MdOutlineFamilyRestroom, MdOutlineNightShelter } from 'react-icons/md';
import { PiCallBellLight } from 'react-icons/pi';
import { TbFountain, TbMassage } from 'react-icons/tb';
import { useHomeUseCase } from '../use-cases/useHomeUseCase';
import RecommendationCard from './recommendationCard';

const data = [
    { id: 0, img: PiCallBellLight },
    { id: 1, img: MdOutlineNightShelter },
    { id: 2, img: TbMassage },
    { id: 3, img: GoGift },
    { id: 4, img: TbFountain },
    { id: 5, img: IoGameControllerOutline },
    { id: 6, img: MdOutlineFamilyRestroom },
    { id: 7, img: BsPassport },
];

const sliderData = [...data, ...data];

interface IProps {
    viewModel: ViewModel['Home']['recommendation'];
}

const Recommendation: FC<IProps> = ({}) => {
    const { viewModel } = useHomeUseCase();

    return (
        <div className='mt-[75px]'>
            <Translate
                direction='right'
                distance={100}
                animateOnce={false}
            >
                <div className='flex flex-col items-center justify-center gap-5'>
                    <h3 className='uppercase text-lg font-semibold'>{viewModel.recommendation.title}</h3>
                    <Translate
                        direction='right'
                        distance={100}
                        animateOnce={false}
                    >
                        <h2 className='font-medium text-[34px] max-w-[830px] text-center'>{viewModel.recommendation.description}</h2>
                    </Translate>
                </div>
            </Translate>

            <Translate
                direction='down'
                distance={60}
                animateOnce={false}
            >
                <Slider
                    loop
                    slidesPerView={8}
                    spacing={15}
                    classNameSlider='mt-[50px]'
                >
                    {sliderData.map((item, index) => {
                        const Icon = item.img;
                        return (
                            <div
                                key={index}
                                className='flex flex-col items-center gap-3 group cursor-pointer'
                            >
                                <div className='p-[30px] bg-background_1 rounded-full shadow-lg transition-all duration-300 group-hover:bg-[var(--yellow)] active:bg-[var(--yellow)]'>
                                    <Icon className='text-4xl text-foreground_1 group-hover:text-white w-[34px] h-[34px]' />
                                </div>
                                <p className='font-semibold text-base text-center group-hover:text-[var(--yellow)] active:text-[var(--yellow)]'>{viewModel.recommendation.links[index]}</p>
                            </div>
                        );
                    })}
                </Slider>
            </Translate>

            <div className='grid grid-cols-4 mt-[60px] gap-x-5 gap-y-[34px]'>
                {Array.from({ length: 8 }).map((_, index) => (
                    <RecommendationCard key={index} />
                ))}
            </div>

            <div className='flex items-center justify-center'>
                <Button
                    variant={'yellow'}
                    className='mt-[34px] rounded-[42px] px-[22px] py-[14px] h-[52px] flex items-center'
                >
                    {viewModel.recommendation.button}
                    <GoArrowRight />
                </Button>
            </div>
        </div>
    );
};

export default Recommendation;
