import { Link } from '@/i18n/routing';
import { NAV_LINKS } from '@/lib';
import { Button } from '@components';
import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';
import { useNavbarUseCase } from './use-cases/useNavbarUseCase';
import { navbarIcons } from './navbar';

interface IProps {}

const MobileNavbar: FC<IProps> = () => {
    const { viewModel, navigateToAuthOrProfile, user, shouldHighlightLink, shouldHighlightBtn } = useNavbarUseCase();

    return (
        <div className="fixed inset-x-0 top-[87px] h-screen bg-background_1 px-5 py-10 flex flex-col overflow-y-auto">
            <nav className={clsx('flex flex-wrap justify-around md:flex-col md:items-start gap-8')}>
                {NAV_LINKS.map((path, index) => (
                    <Link
                        key={path}
                        href={path}
                        className={clsx('font-semibold uppercase text-sm sm:text-xs hover:text-yellow', shouldHighlightLink(path) && 'text-yellow')}
                    >
                        <div className='flex items-center gap-[10px]'>
                            {navbarIcons[index]}
                            {viewModel.navbar.links[index]}
                        </div>
                    </Link>
                ))}
                <div className='flex items-center justify-center w-full'>
                    <Button
                        onClick={navigateToAuthOrProfile}
                        className={clsx('bg-transparent uppercase text-foreground_1 font-semibold shadow-none p-5 rounded-3xl border-foreground_1  border cursor-pointer hover:bg-yellow hover:border-background_1 hover:text-white xs:w-full', shouldHighlightBtn && 'bg-yellow  border-background_1 text-white')}
                    >
                        {user ? user.email : viewModel.navbar.button1}
                    </Button>
                </div>
            </nav>
            <div className='flex items-center gap-8 justify-center sm:flex-col'>
                <div className='bg-[var(--yellow)] rounded-[45px] pt-[25px] px-[39px] mt-10 flex items-center justify-center'>
                    <Image
                        src={'/mobileImg.webp'}
                        alt='phone'
                        width={186}
                        height={241}
                    />
                </div>
                <div className='flex flex-col items-center'>
                    <div className='flex items-center justify-center'>
                        <Button
                            variant={'yellow'}
                            className='rounded-[42px] px-[22px] py-[14px] h-[52px] flex items-center'
                        >
                            {viewModel.navbar.button2}
                        </Button>
                    </div>
                    <div className='flex flex-col gap-[10px] mt-[30px] lg:mt-6 lg:justify-center lg:items-center'>
                        <p className='text-lg font-medium pr-[90px] lg:text-center lg:pr-0'>{viewModel.navbar.button3}</p>
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
                </div>
            </div>
        </div>
    );
};

export default MobileNavbar;
