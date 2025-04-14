'use client';
import { Link } from '@/i18n/routing';
import { Slider } from '@components';
import { FC } from 'react';
import { SlArrowRight } from 'react-icons/sl';
import { useMediaQuery } from 'react-responsive';
import { BsPassport } from 'react-icons/bs';
import { GoGift } from 'react-icons/go';
import { IoGameControllerOutline } from 'react-icons/io5';
import { MdOutlineFamilyRestroom, MdOutlineNightShelter } from 'react-icons/md';
import { PiCallBellLight } from 'react-icons/pi';
import { TbFountain, TbMassage } from 'react-icons/tb';
import { useAllEnterprisesUseCase } from '../use-cases/useAllEnterprisesUseCase';

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
    viewModel: ViewModel['AllEnterprises']['hero'];
}

const Hero: FC<IProps> = ({}) => {
    const { viewModel } = useAllEnterprisesUseCase();
    const isLargeScreen = useMediaQuery({ minWidth: 1025 });
    const isSmallScreen = useMediaQuery({ minWidth: 440 });

    const itemsCount = isLargeScreen ? 7 : isSmallScreen ? 4 : 3;
    const itemsSpacing = isLargeScreen ? 15 : 20;
    return (
        <div className='mt-[50px] lg:mt-0 max-w-[1340px] m-auto px-14 lg:px-0'>
            <div className='flex items-center gap-2 lg:hidden'>
                <Link href='/'>
                    <span className='opacity-50 hover:text-yellow hover:opacity-100'>{viewModel.hero.home}</span>
                </Link>
                <SlArrowRight className='text-[14px] opacity-50' />
                <span className='opacity-50'>{viewModel.hero.allEnterprises}</span>
            </div>
            <div className='w-full h-[280px] lg:px-5 flex flex-col justify-center items-center gap-7 rounded-[25px] mt-[20px] lg:m-0 lg:rounded-none bg-[linear-gradient(0deg,rgba(9,9,9,0.60)_0%,rgba(9,9,9,0.60)_100%),url("/enterprisesBg.webp")] lg:bg-[linear-gradient(0deg,rgba(9,9,9,0.50)_0%,rgba(9,9,9,0.50)_100%),url("/enterprisesBg.webp")] bg-cover bg-center bg-no-repeat'>
                <h2 className='uppercase text-white text-center text-6xl lg:text-3xl font-semibold lg:font-bold'>{viewModel.hero.explore}</h2>
                <p className='text-white text-lg lg:text-sm font-normal text-center max-w-[634px]'>{viewModel.hero.openNew}</p>
            </div>
            <Slider
                loop
                slidesPerView={itemsCount}
                spacing={itemsSpacing}
                classNameSlider='mt-[50px] lg:mt-[60px]'
            >
                {sliderData.map((item, index) => {
                    const Icon = item.img;
                    return (
                        <div
                            key={index}
                            className='flex flex-col items-center gap-5 lg:gap-[10px] group cursor-pointer pt-2'
                        >
                            <div className='p-[30px] lg:p-[23px] flex items-center justify-center bg-background_1 rounded-full shadow-[0_0_10px_1px_rgba(41,53,61,0.20)] transition-all duration-300 group-hover:bg-yellow active:bg-[var(--yellow)]'>
                                <Icon className='text-foreground_1 group-hover:text-white w-[34px] h-[34px] lg:w-5 lg:h-5' />
                            </div>
                            <p className='font-semibold text-base lg:text-xs lg:font-medium text-center lg:text-wrap group-hover:text-[var(--yellow)] active:text-[var(--yellow)]'>{viewModel.hero.links[index]}</p>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};

export default Hero;
