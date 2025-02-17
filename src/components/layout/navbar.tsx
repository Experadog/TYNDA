import { Link, usePathname } from '@/i18n/routing';
import { PAGES } from '@/lib';
import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import ThemeToggle from '../toggle-theme/toggle-theme';

interface IProps {
    viewModel: ViewModel['Layout']['navbar'];
}

const Navbar: FC<IProps> = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    const links = [
        {
            path: PAGES.BENEFITS_MAP,
            label: 'Карта рекомендаций',
        },

        {
            path: PAGES.ABOUT,
            label: 'О клубе',
        },

        {
            path: PAGES.LOGIN,
            label: 'Войти',
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header
            className={clsx(
                'flex items-center justify-center h-16 fixed top-0 w-full transition-all duration-500 px-4 z-50',
                isScrolled || pathname != PAGES.HOME
                    ? 'bg-background_2 shadow-lg text-foreground_1'
                    : 'bg-transparent text-white'
            )}
        >
            <Link
                href={PAGES.HOME}
                className='uppercase absolute left-5 text-4xl text-yellow font-extralight'
            >
                s-club
            </Link>

            <nav className='flex items-center justify-center gap-5 self-center'>
                {links.map(({ label, path }) => (
                    <Link
                        key={label}
                        href={path}
                        className={'uppercase font-black  text-xs text-inherit hover:text-yellow'}
                    >
                        {label}
                    </Link>
                ))}
            </nav>
            <div className='flex items-center gap-3 absolute right-5'>
                <ThemeToggle />
            </div>
        </header>
    );
};

export default Navbar;
