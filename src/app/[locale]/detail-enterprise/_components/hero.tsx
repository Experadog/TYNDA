'use client';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { FC } from 'react';
import { SlArrowRight } from 'react-icons/sl';
import { IoStar } from 'react-icons/io5';
import { LuDot } from 'react-icons/lu';
import { LiaPhoneSolid } from 'react-icons/lia';
import { BsGeoAlt } from 'react-icons/bs';
import { GoClock } from 'react-icons/go';
import { Button } from '@components';
import { TbMapSearch } from 'react-icons/tb';
import { useDetailEnterpriseUseCase } from '../use-cases/useDetailEnterpriseUseCase';

interface IProps {
    viewModel: ViewModel['DetailEnterprise']['hero'];
}

const Hero: FC<IProps> = ({}) => {
    const { viewModel } = useDetailEnterpriseUseCase();
    return (
        <div className='mt-[50px] lg:mt-[30px]'>
            <div className='lg:hidden'>
                <div className='flex items-center gap-2 lg:hidden'>
                    <Link href='/'>
                        <span className='opacity-50 hover:text-yellow hover:opacity-100'>{viewModel.hero.home}</span>
                    </Link>
                    <SlArrowRight className='text-[14px] opacity-50' />
                    <span className='opacity-50'>Этно - Комплекс Супара</span>
                </div>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-1 items-start lg:items-center justify-between gap-7 mt-5'>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <Image
                        src='/enterprisesBg.webp'
                        alt='main image'
                        width={650}
                        height={520}
                        className='rounded-[20px] w-[650px] h-[520px] lg:w-[353px] lg:h-[270px]'
                    />
                    <div className='grid grid-cols-3 items-center gap-4 lg:hidden'>
                        <Image
                            src='/enterprisesBg.webp'
                            alt='small image 1'
                            width={205}
                            height={170}
                            className='rounded-[10px] w-[205px] h-[170px]'
                        />
                        <Image
                            src='/enterprisesBg.webp'
                            alt='small image 2'
                            width={205}
                            height={170}
                            className='rounded-[10px] w-[205px] h-[170px]'
                        />
                        <Image
                            src='/enterprisesBg.webp'
                            alt='small image 3'
                            width={205}
                            height={170}
                            className='rounded-[10px] w-[205px] h-[170px]'
                        />
                    </div>
                </div>

                <div className='flex flex-col gap-7 lg:items-start'>
                    <h2 className='text-4xl font-medium lg:text-2xl lg:font-semibold'>Этно - Комплекс Супара</h2>
                    <div className='flex flex-col gap-4'>
                        <p className='text-lg font-medium'>
                            <span className='mr-[10px] text-lg font-semibold'>Отель</span>Бишкек, Кыргызстан
                        </p>
                        <p className='flex gap-2 items-center numeric'>
                            <span>
                                <IoStar className='text-[var(--yellow)] md:text-sm' />
                            </span>
                            <span className='flex items-center text-lg lg:text-base font-medium'>
                                <span className='text-lg font-semibold'>4.9</span>
                                <LuDot className='text-xl' />
                                18 отзывов
                            </span>
                        </p>
                    </div>
                    <div className='flex flex-col gap-4 px-5 lg:px-[10px] py-4 shadow-[0_0_15px_2px_rgba(41,53,61,0.20)] rounded-[15px] bg-background_1'>
                        <div>
                            <p className='flex items-center gap-4 py-2 numeric'>
                                <span>
                                    <BsGeoAlt className='w-6 h-6 text-yellow' />
                                </span>
                                <span className='text-base font-medium'>{viewModel.hero.address}</span>
                                <span className='text-base font-medium opacity-70'>ул. Карагул Акмат б/н, село Кок-Жар 720000</span>
                            </p>
                        </div>
                        <div>
                            <p className='flex items-center gap-4 py-2 numeric'>
                                <span>
                                    <LiaPhoneSolid className='w-6 h-6 text-yellow' />
                                </span>
                                <span className='text-base font-medium'>{viewModel.hero.contacts}</span>
                                <span className='text-base font-medium opacity-70'>+996 554-555-555 </span>
                            </p>
                        </div>
                        <div>
                            <p className='flex items-center gap-4 py-2 numeric'>
                                <span>
                                    <GoClock className='w-6 h-6 text-yellow' />
                                </span>
                                <span className='text-base font-medium'>{viewModel.hero.workTime}</span>
                                <span className='text-base font-medium opacity-70'>+996 554-555-555 </span>
                            </p>
                        </div>
                    </div>

                    <div className='max-w-[650px]'>
                        <h3 className='text-lg font-semibold uppercase lg:text-2xl'>{viewModel.hero.aboutEnterprise}</h3>
                        <p className='text-base font-normal'>
                            Supara Chunkurchak — это отель, расположенный в городе Бишкек.К услугам гостей фитнес-центр, сад, терраса и ресторан. Гости могут воспользоваться услугами консьержа или детской игровой площадкой. Гости могут обратиться к сотрудникам круглосуточной стойки регистрации, воспользоваться трансфером от/до аэропорта или доставкой еды и напитков, а также подключиться к
                            бесплатному Wi-Fi. <br />
                            Во всех номерах имеется холодильник, мини-бар и чайник, а также душ, бесплатные туалетно-косметические принадлежности и письменный стол. Гостям Supara Chunkurchak предоставляются постельное белье и полотенца.
                        </p>
                    </div>
                    <div className='flex items-center justify-between w-full gap-3 lg:hidden'>
                        <Button className='rounded-[25px] w-full text-yellow bg-background_1 border  border-yellow hover:text-white hover:bg-yellow h-12 text-lg font-semibold'>{viewModel.hero.button1}</Button>
                        <Button className='flex items-center gap-[10px] rounded-[25px] w-full text-yellow bg-background_1 border  border-yellow hover:text-white hover:bg-yellow h-12 text-lg font-semibold'>
                            <TbMapSearch />
                            {viewModel.hero.button2}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
