'use client';
import { Button } from '@components';
import Image from 'next/image';
import { FC } from 'react';

interface IProps { }

const MoreAboutPlans: FC<IProps> = ({ }) => {
    return (
        <div className='mt-[120px] lg:mt-[60px] lg:px-5'>
            <div className='flex flex-col items-center'>
                <h3 className='text-5xl font-semibold lg:text-4xl lg:text-center'>Подробнее о планах</h3>
                <div className='flex items-center justify-center mt-[44px]'>
                    <Button
                        variant={'yellow'}
                        className='rounded-[42px] px-[22px] py-[14px] h-[52px] flex items-center text-base font-semibold'
                    >
                        Скачать приложение
                    </Button>
                </div>
                <div className='flex flex-col gap-[10px] mt-[30px] lg:mt-6 justify-center items-center'>
                    <p className='text-lg font-medium text-center'>
                        Доступно на
                    </p>
                    <div className='flex items-center gap-[10px]'>
                        <Image
                            priority
                            src={'/sm/appStoreImg.webp'}
                            alt='app store'
                            width={128}
                            height={43}
                            className='cursor-pointer'
                        />
                        <Image
                            priority
                            src={'/sm/googlePlayImg.webp'}
                            alt='google'
                            width={128}
                            height={43}
                            className='cursor-pointer h-[43px]'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoreAboutPlans;
