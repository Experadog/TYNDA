'use client';
import { Button } from '@components';
import Image from 'next/image';
import { FC, useState } from 'react';
import { FaCalendarDays, FaSackDollar } from "react-icons/fa6";
import { FiCheckCircle } from 'react-icons/fi';
import { GoGraph } from "react-icons/go";
import { HiGift } from "react-icons/hi";
import { HiPhone } from "react-icons/hi2";
import { IoBan } from "react-icons/io5";
import { MdOutlineDiamond, MdRocketLaunch } from "react-icons/md";
import { TbCoins, TbRosetteDiscountFilled, TbVip } from 'react-icons/tb';

const features = [
    { icon: <FiCheckCircle className='text-yellow w-6 h-6' /> },
    { icon: <TbCoins className='text-yellow w-6 h-6' /> },
    { icon: <MdOutlineDiamond className='text-yellow w-6 h-6' /> },
    { icon: <TbRosetteDiscountFilled className='text-yellow w-6 h-6' /> },
    { icon: <HiGift className='text-yellow w-6 h-6' /> },
    { icon: <HiPhone className='text-yellow w-6 h-6' /> },
    { icon: <MdRocketLaunch className='text-yellow w-6 h-6' /> },
    { icon: <IoBan className='text-yellow w-6 h-6' /> },
    { icon: <FaCalendarDays className='text-yellow w-6 h-6' /> },
    { icon: <GoGraph className='text-yellow w-6 h-6' /> },
    { icon: <FaSackDollar className='text-yellow w-6 h-6' /> },
    { icon: <TbVip className='text-yellow w-6 h-6' /> },
];

interface IProps {
    touristicPlanViewModel: ViewModel['Tariffs']['touristicPlan']
}

const TouristicPlan: FC<IProps> = ({ touristicPlanViewModel }) => {

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <div className='flex flex-col items-center gap-10 mt-20 lg:mt-16'>
                <h3 className='text-5xl lg:text-3xl font-semibold text-center uppercase'>
                    {touristicPlanViewModel.title}
                </h3>
            </div>
            <div className='mt-[40px] h-auto bg-yellow bg-no-repeat flex gap-[46px] lg:gap-[30px] justify-between lg:flex-col lg:items-center p-5 pl-[50px] lg:px-[17px] lg:py-[34px] rounded-[35px] relative'>
                <div className='flex items-center'>
                    <div className='flex flex-col items-start lg:items-center gap-[300px] lg:gap-[60px]'>
                        <div className='absolute lg:hidden bottom-[50px] left-[50px] w-[738px] min-h-[440px] opacity-30'>
                            <Image
                                priority
                                className='w-full h-[440px]'
                                src='/tariffs/earthDots.webp'
                                alt='card image'
                                width={738}
                                height={440}
                            />
                        </div>
                        <div className='flex flex-col gap-[15px] max-w-[272px]'>
                            <h3 className='text-3xl font-semibold text-white'>{touristicPlanViewModel.titleBlock}</h3>
                            <p className='text-xl font-medium text-white'>
                                {touristicPlanViewModel.description}
                            </p>
                        </div>
                        <div className='w-[367px] h-[329px] z-10 lg:block hidden'>
                            <Image
                                priority
                                className='w-full'
                                src='/tariffs/planCard2.webp'
                                alt='card image'
                                width={505}
                                height={453}
                            />
                        </div>
                        <div className='flex flex-col gap-5 lg:gap-14 max-w-[352px]'>
                            <Button onClick={() => setModalOpen(true)} className='text-base font-bold py-[17px] h-[56px] rounded-[25px] z-10'>
                                {touristicPlanViewModel.buyCard}
                            </Button>
                            <div className='flex flex-col gap-[10px] px-[15px]'>
                                <p className='text-lg font-bold text-white text-center numeric'>{touristicPlanViewModel.costPerWeek}</p>
                                <p className='text-sm font-medium text-white opacity-90 text-center max-w-[352px]'>
                                    {touristicPlanViewModel.autoRenewed}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='w-[505px] h-[453px] z-10 lg:hidden'>
                        <Image
                            priority
                            className='w-full'
                            src='/tariffs/planCard2.webp'
                            alt='card image'
                            width={505}
                            height={453}
                        />
                    </div>
                </div>
                <div className='bg-background_1 flex flex-col p-[15px] rounded-[25px] max-w-[356px]'>
                    {features.map((item, index) => (
                        <div key={index} className='flex items-center gap-[10px] py-2'>
                            <div className='p-[10px]'>{item.icon}</div>
                            <p className='text-foreground_1 text-base font-medium'>{touristicPlanViewModel.bonuses[index]}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Модальное окно */}
            {modalOpen && (
                <div
                    onClick={() => setModalOpen(false)}
                    className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-background_1 rounded-2xl p-6 w-[300px] shadow-xl text-center">
                        <div className="flex flex-col items-center gap-3">
                            <IoBan className="text-yellow w-10 h-10" />
                            <p className="text-lg text-foreground_1 font-semibold mb-4">{touristicPlanViewModel.modalText}</p>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="bg-yellow text-black font-semibold py-2 px-4 rounded-xl hover:bg-yellow/80 transition"
                            >
                                Ок
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TouristicPlan;