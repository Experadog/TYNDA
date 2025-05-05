'use client';
import { Button } from '@components';
import Image from 'next/image';
import { FC } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { LuGrid2X2 } from 'react-icons/lu';
import { PiHandHeart } from 'react-icons/pi';
import { TbCoins } from 'react-icons/tb';

const iconPaths = [
    '/tariffs/spotifyIcon.svg',
    '/tariffs/airbnbIcon.svg',
    '/tariffs/appleIcon.svg',
    '/tariffs/githubIcon.svg',
    '/tariffs/snapchatIcon.svg',
    '/tariffs/facebookIcon.svg',
];

interface IProps { }

const TouristicPlan: FC<IProps> = ({ }) => {
    return (
        <div className='mt-[60px] h-[477px] lg:h-auto bg-yellow bg-no-repeat flex gap-[46px] lg:gap-[30px] justify-between lg:flex-col lg:items-center p-[50px] lg:px-[17px] lg:py-[34px] rounded-[35px] relative'>
            <div className='flex items-center'>
                <div className='flex flex-col items-start gap-[138px] lg:gap-[60px] relative'>
                    <div className='absolute lg:hidden bottom-[-17px] left-2 w-[559px] h-[286px] opacity-30'>
                        <Image
                            priority
                            className='w-full h-auto'
                            src='/tariffs/earthDots.webp'
                            alt='card image'
                            width={559}
                            height={286}
                        />
                    </div>
                    <div className='flex flex-col gap-[15px] max-w-[272px]'>
                        <h3 className='text-3xl font-semibold text-white'>TOURISTIC PLAN</h3>
                        <p className='text-xl font-medium text-white'>
                            Туристическая клубная карта
                        </p>
                    </div>
                    <div className='w-[367px] h-[329px] hidden lg:block'>
                        <Image
                            priority
                            className='w-full'
                            src='/tariffs/planCard.webp'
                            alt='card image'
                            width={367}
                            height={329}
                        />
                    </div>
                    <div className='flex flex-col gap-5 lg:gap-14 max-w-[352px]'>
                        <Button className='text-base font-bold py-[17px] h-[56px] rounded-[25px]'>
                            Приобрести клубную карту
                        </Button>
                        <div className='flex flex-col gap-[10px] px-[15px]'>
                            <p className='text-lg font-bold text-white text-center'>10.00 $/нед.</p>
                            <p className='text-sm font-medium text-white opacity-90 text-center max-w-[352px]'>
                                Продлевается автоматически. Можно отменить в любое время
                            </p>
                        </div>
                    </div>
                </div>
                <div className='lg:hidden block'>
                    <Image
                        priority
                        className='min-w-[505px] min-h-[453px] absolute top-[-26px] left-[383px]'
                        src='/tariffs/planCard2.webp'
                        alt='card image'
                        width={505}
                        height={453}
                    />
                </div>
            </div>

            <div className='bg-background_1 flex flex-col gap-[15px] p-[15px] rounded-[25px] max-w-[356px]'>
                <div className='flex items-center gap-[10px] px-1 py-[10px]'>
                    <div className='p-[10px]'>
                        <FiCheckCircle className='text-yellow w-6 h-6' />
                    </div>
                    <p className='text-foreground_1 text-base font-medium'>
                        Дополнительные бонусы и привилегии
                    </p>
                </div>
                <div className='flex items-center gap-[10px] px-1 py-[10px]'>
                    <div className='p-[10px]'>
                        <TbCoins className='text-yellow w-6 h-6' />
                    </div>
                    <p className='text-foreground_1 text-base font-medium'>
                        Простота использования и накопление баллов
                    </p>
                </div>
                <div className='flex items-center gap-[10px] px-1 py-[10px]'>
                    <div className='p-[10px]'>
                        <PiHandHeart className='text-yellow w-6 h-6' />
                    </div>
                    <p className='text-foreground_1 text-base font-medium'>
                        Эксклюзивные скидки и специальные предложения
                    </p>
                </div>

                <div className='flex flex-col px-1 py-[10px]'>
                    <div className='flex items-center'>
                        <div className='p-[10px]'>
                            <LuGrid2X2 className='text-yellow w-6 h-6' />
                        </div>
                        <p className='text-foreground_1 text-base font-medium'>
                            Наши партнеры-предприятия:
                        </p>
                    </div>

                    <div className='flex justify-center items-center'>
                        {iconPaths.map((path, index) => (
                            <div
                                key={index}
                                className={`w-[44px] h-[44px] rounded-full overflow-hidden ${index !== 0 ? '-ml-2' : ''
                                    }`}
                            >
                                <Image
                                    priority
                                    src={path}
                                    alt={`partner-${index}`}
                                    width={44}
                                    height={44}
                                    className='object-cover w-full h-full'
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TouristicPlan;
