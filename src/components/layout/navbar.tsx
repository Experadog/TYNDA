import { Link } from '@/i18n/routing';
import { NAV_LINKS } from '@/lib';
import { Button, ToggleLocale, ToggleTheme } from '@components';
import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';
import { useNavbarUseCase } from './use-cases/useNavbarUseCase';

interface IProps {
    viewModel: ViewModel['Layout']['navbar'];
}

const Navbar: FC<IProps> = () => {
    const { isScrolled, navigateToAuthOrProfile, user, viewModel, shouldHighlightLink, shouldHighlightBtn } = useNavbarUseCase();

    return (
        <header
            id='navbar'
            className={clsx('bg-background_1  flex items-center px-12 py-5 gap-16 sticky z-50 top-0 right-0 left-0 transition-shadow', isScrolled ? 'shadow-md' : 'shadow-none')}
        >
            <div className='w-[62px] h-[48px]'>
                <Image
                    src={'/logo.svg'}
                    alt='logo'
                    width={62}
                    height={48}
                />
            </div>

            <nav className='flex items-center gap-10'>
                {NAV_LINKS.map((path, index) => (
                    <Link
                        key={path}
                        href={path}
                        className={clsx('font-semibold uppercase  text-sm hover:text-yellow', shouldHighlightLink(path) && 'text-yellow')}
                    >
                        {viewModel.navbar.links[index]}
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
