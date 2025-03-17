'use client';

import { Button } from '@components';
import { FC } from 'react';
import { PiCallBellLight } from 'react-icons/pi';
import { MdOutlineNightShelter } from 'react-icons/md';
import { TbMassage } from 'react-icons/tb';
import { GoGift } from 'react-icons/go';
import { TbFountain } from 'react-icons/tb';
import { IoGameControllerOutline } from 'react-icons/io5';
import { MdOutlineFamilyRestroom } from 'react-icons/md';
import { BsPassport } from 'react-icons/bs';
import { GoArrowRight } from 'react-icons/go';
import { useKeenSlider } from 'keen-slider/react';
import RecomendationCard from './recomendationCard';
import 'keen-slider/keen-slider.min.css';
import { useHomeUseCase } from '../use-cases/useHomeUseCase';
import { Translate } from '@components';

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
    viewModel: ViewModel['Home']['recomendation'];
}

const Recomendation: FC<IProps> = ({}) => {
    const { viewModel } = useHomeUseCase();
    const [sliderRef] = useKeenSlider({
        loop: true,
        slides: { perView: 8, spacing: 15 },
    });
    return (
        <div className='mt-[75px]'>
            <Translate
                direction='right'
                distance={100}
                animateOnce={false}
            >
                <div className='flex flex-col items-center justify-center gap-5'>
                    <h3 className='uppercase text-lg font-semibold'>{viewModel.recomendation.title}</h3>
                    <Translate
                        direction='right'
                        distance={100}
                        animateOnce={false}
                    >
                        <h2 className='font-medium text-[34px] max-w-[830px] text-center'>{viewModel.recomendation.description}</h2>
                    </Translate>
                </div>
            </Translate>

            <Translate
                direction='down'
                distance={60}
                animateOnce={false}
            >
                <div
                    ref={sliderRef}
                    className='keen-slider mt-[50px]'
                >
                    {sliderData.map((item, index) => {
                        const Icon = item.img;
                        return (
                            <div
                                key={index}
                                className='keen-slider__slide flex flex-col items-center gap-3 group cursor-pointer'
                            >
                                <div className='p-[30px] bg-white rounded-full shadow-lg transition-all duration-300 group-hover:bg-[#F4A900] active:bg-[#F4A900]'>
                                    <Icon className='text-4xl text-[#1C1C1C] group-hover:text-white w-[34px] h-[34px]' />
                                </div>
                                <p className='font-semibold text-base text-center group-hover:text-[#F4A900] active:text-[#F4A900]'>{viewModel.recomendation.links[index]}</p>
                            </div>
                        );
                    })}
                </div>
            </Translate>

            <div className='grid grid-cols-4 mt-[60px] gap-x-5 gap-y-[34px]'>
                {Array.from({ length: 8 }).map((_, index) => (
                    <RecomendationCard key={index} />
                ))}
            </div>

            <div className='flex items-center justify-center'>
                <Button
                    variant={'yellow'}
                    className='mt-[34px] rounded-[42px] px-[22px] py-[14px] h-[52px] flex items-center'
                >
                    {viewModel.recomendation.button}
                    <GoArrowRight />
                </Button>
            </div>
        </div>
    );
};

export default Recomendation;
