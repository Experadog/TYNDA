'use client';
import { Translate } from '@components';
import Image from 'next/image';
import { FC } from 'react';
import { useHomeUseCase } from '../use-cases/useHomeUseCase';

interface IProps {
    viewModel: ViewModel['Home']['adMobile'];
}

const AdMobile: FC<IProps> = ({}) => {
    const { viewModel } = useHomeUseCase();
    return (
        <div className='mt-[120px] grid grid-cols-2 gap-[40px]'>
            <Translate
                direction='right'
                distance={100}
                animateOnce={false}
            >
                <div className='bg-[var(--yellow)] rounded-[45px] pt-[25px] px-[39px]'>
                    <Image
                        src={'/mobileImg.webp'}
                        alt='phone'
                        width={540}
                        height={699}
                    />
                </div>
            </Translate>
            <Translate
                direction='left'
                distance={100}
                animateOnce={false}
            >
                <div className='flex flex-col gap-[40px] max-w-[487px]'>
                    <h2 className='font-medium text-[34px] uppercase'>{viewModel.adMobile.title}</h2>
                    <p className='text-base font-normal'>{viewModel.adMobile.description1}</p>
                    <p className='text-base font-normal'>{viewModel.adMobile.description2}</p>
                    <Translate
                        direction='up'
                        distance={50}
                        animateOnce={false}
                    >
                        <div className='flex flex-col gap-[10px] mt-[30px]'>
                            <p className='text-lg font-medium pr-[90px]'>{viewModel.adMobile.links}</p>
                            <div className='flex items-center gap-[10px]'>
                                <Image
                                    src={'/appStoreImg.webp'}
                                    alt='app store'
                                    width={128}
                                    height={43}
                                    className='cursor-pointer'
                                />
                                <Image
                                    src={'/googlePlayImg.webp'}
                                    alt='google'
                                    width={128}
                                    height={43}
                                    className='cursor-pointer h-[43px]'
                                />
                            </div>
                        </div>
                    </Translate>
                </div>
            </Translate>
        </div>
    );
};

export default AdMobile;
