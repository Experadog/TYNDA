import { Link } from '@/i18n/routing';
import { NAV_LINKS } from '@/lib';
import { Button, ToggleLocale, ToggleTheme } from '@components';
import clsx from 'clsx';
import Image from 'next/image';
import { FC, useState } from 'react';
import { CgInfo } from 'react-icons/cg';
import { IoClose } from 'react-icons/io5';
import { LiaPhoneSolid } from 'react-icons/lia';
import { LuCreditCard } from 'react-icons/lu';
import { RiHome6Line } from 'react-icons/ri';
import { RxHamburgerMenu } from 'react-icons/rx';
import { TbMapSearch } from 'react-icons/tb';
import MobileNavbar from './mobile-navbar';
import { useNavbarUseCase } from './use-cases/useNavbarUseCase';

interface IProps {
    viewModel: ViewModel['Layout']['navbar'];
}

export const navbarIcons = [<RiHome6Line className='w-[18px] h-[18px]' />, <TbMapSearch className='w-[18px] h-[18px]' />, <CgInfo className='w-[18px] h-[18px]' />, <LiaPhoneSolid className='w-[18px] h-[18px]' />, <LuCreditCard className='w-[18px] h-[18px]' />];

const Navbar: FC<IProps> = () => {
    const { navigateToAuthOrProfile, user, viewModel, shouldHighlightLink, shouldHighlightBtn } = useNavbarUseCase();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header
            id='navbar'
            className={clsx('bg-background_1 flex flex-col sticky z-50 top-0 right-0 left-0 transition-shadow shadow-lg')}
        >
            <div className='flex items-center px-10 xs:px-5 py-5 gap-8 justify-between'>
                <div className='w-[50px] h-[48px]'>
                    <Link href={'/'}>
                        <Image
                            src={'/logo.svg'}
                            alt='Логотип'
                            width={50}
                            height={48}
                            className='min-w-[50px] min-h-[48px]'
                        />
                    </Link>
                </div>

                <nav className={clsx('flex items-center gap-7 xl:gap-4 whitespace-nowrap lg:hidden')}>
                    {NAV_LINKS.map((path, index) => (
                        <Link
                            key={path}
                            href={path}
                            className={clsx('font-semibold uppercase text-sm hover:text-yellow', shouldHighlightLink(path) && 'text-yellow')}
                        >
                            <div className='flex items-center gap-[10px]'>
                                {navbarIcons[index]}
                                {viewModel.navbar.links[index]}
                            </div>
                        </Link>
                    ))}
                </nav>

                <nav className='flex items-center gap-5 xl:gap-3 exs:gap-3 relative'>
                    <ToggleTheme />
                    <ToggleLocale />
                    <Button
                        onClick={navigateToAuthOrProfile}
                        className={clsx('bg-transparent uppercase text-foreground_1 font-semibold shadow-none p-5 rounded-3xl border-foreground_1  border cursor-pointer hover:bg-yellow hover:border-background_1 hover:text-white lg:hidden text-xs', shouldHighlightBtn && 'bg-yellow  border-background_1 text-white')}
                    >
                        {user ? user.email : viewModel.navbar.button1}
                    </Button>

                    {/* Бургер-меню для мобильных устройств */}
                    <div className='lg:flex hidden items-center ml-auto'>
                        <Button
                            onClick={toggleMenu}
                            className='bg-transparent text-foreground_1 py-2 px-4 rounded-[50px] border-foreground_1 border hover:bg-yellow hover:border-yellow hover:text-white'
                        >
                            <div>{isMenuOpen ? <IoClose /> : <RxHamburgerMenu />}</div>
                        </Button>
                    </div>
                </nav>
            </div>
            {isMenuOpen && <MobileNavbar />}
        </header>
    );
};

export default Navbar;
