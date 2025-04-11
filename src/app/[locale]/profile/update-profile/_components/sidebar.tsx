'use client';
import { Link, usePathname } from '@/i18n/routing';
import { PAGES, PROFILE_LINKS } from '@/lib';
import { Button } from '@components';
import clsx from 'clsx';
import { FC, useMemo } from 'react';

import { FiCreditCard } from 'react-icons/fi';
import { HiOutlineChatAlt } from 'react-icons/hi';
import { LuShieldHalf, LuUserRound } from 'react-icons/lu';
import { MdLogout } from 'react-icons/md';

interface IProps {}

const Sidebar: FC<IProps> = ({}) => {
    const pathname = usePathname();

    const icons = [
        <LuUserRound />,
        <LuShieldHalf />,
        <FiCreditCard />,
        <HiOutlineChatAlt />,
    ];
    const labels = [
        'Личный данные',
        'Вход и безопасность',
        'Управление тарифом',
        'Чат с предприятием',
    ];

    const shouldHighlightLink = useMemo(
        () => (path: string) => path === pathname,
        [pathname],
    );

    return (
        <div className='flex flex-col gap-5 rounded-3xl shadow-md p-6 bg-background_1'>
            <div className='flex flex-col gap-6'>
                {PROFILE_LINKS.map((link, index) => (
                    <Link
                        key={link}
                        className={clsx(
                            'flex items-center gap-3 font-semibold text-base transition-colors hover:bg-yellow hover:text-white px-3 py-2 rounded-2xl',
                            shouldHighlightLink(link)
                                ? 'bg-yellow text-white'
                                : '',
                        )}
                        href={link}
                    >
                        {icons[index]}
                        {labels[index]}
                    </Link>
                ))}
            </div>

            <div className='w-full h-[1px] bg-light_gray' />

            <Link
                href={PAGES.PROFILE}
                className='text-yellow border-2 border-yellow rounded-2xl text-center p-2 font-semibold hover:bg-background_2'
            >
                Вернуться в профиль
            </Link>
            <Button
                variant={'ghost'}
                className='flex items-center gap-2'
            >
                <MdLogout />
                Выйти
            </Button>
        </div>
    );
};

export default Sidebar;
