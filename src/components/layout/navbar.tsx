import { Link } from '@/i18n/routing';
import { NAV_LINKS } from '@/lib';
import { Button, ToggleLocale, ToggleTheme } from '@components';
import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';
import { CgInfo } from 'react-icons/cg';
import { LiaPhoneSolid } from 'react-icons/lia';
import { LuCreditCard } from 'react-icons/lu';
import { RiHome6Line } from 'react-icons/ri';
import { TbMapSearch } from 'react-icons/tb';
import { useNavbarUseCase } from './use-cases/useNavbarUseCase';

interface IProps {
    viewModel: ViewModel['Layout']['navbar'];
}

const icons = [<RiHome6Line className='w-[18px] h-[18px]' />, <TbMapSearch className='w-[18px] h-[18px]' />, <CgInfo className='w-[18px] h-[18px]' />, <LiaPhoneSolid className='w-[18px] h-[18px]' />, <LuCreditCard className='w-[18px] h-[18px]' />];

const Navbar: FC<IProps> = () => {
    const { navigateToAuthOrProfile, user, viewModel, shouldHighlightLink, shouldHighlightBtn } = useNavbarUseCase();

    return (
        <header
            id='navbar'
            className={clsx('bg-background_1  flex items-center px-12 py-5 gap-16 sticky z-50 top-0 right-0 left-0 transition-shadow shadow-lg')}
        >
            <div className='w-[50px] h-[48px]'>
                <Link href={'/'}>
                    <Image
                        src={'/logo.svg'}
                        alt='logo'
                        width={50}
                        height={48}
                    />
                </Link>
            </div>

            <nav className='flex items-center gap-10'>
                {NAV_LINKS.map((path, index) => (
                    <Link
                        key={path}
                        href={path}
                        className={clsx('font-semibold uppercase  text-sm hover:text-yellow', shouldHighlightLink(path) && 'text-yellow')}
                    >
                        <div className='flex items-center gap-[10px]'>
                            {icons[index]}
                            {viewModel.navbar.links[index]}
                        </div>
                    </Link>
                ))}
            </nav>

            <nav className='flex items-center ml-auto gap-5'>
                <ToggleTheme />
                <ToggleLocale />
                <Button
                    onClick={navigateToAuthOrProfile}
                    className={clsx('bg-transparent uppercase text-foreground_1 font-semibold shadow-none p-5 rounded-3xl border-foreground_1  border cursor-pointer hover:bg-yellow hover:border-background_1 hover:text-white', shouldHighlightBtn && 'bg-yellow  border-background_1 text-white')}
                >
                    {user ? user.email : 'Авторизоваться'}
                </Button>
            </nav>
        </header>
    );
};

export default Navbar;
