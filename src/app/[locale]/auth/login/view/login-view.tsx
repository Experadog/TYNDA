'use client';

import { Link } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { FC } from 'react';
import LoginForm from './_components/login-form';
import LoginVia from './_components/login-via';

const LoginView: FC = () => {
    return (
        <div className='flex flex-col'>
            <div className='flex flex-col gap-3'>
                <h1 className='text-foreground_1 text-2xl font-semibold'>Добро пожаловать!</h1>
                <span className='text-gray'>
                    У вас нет аккаунта?{' '}
                    <Link
                        href={PAGES.REGISTER}
                        className='text-yellow font-semibold ml-2'
                    >
                        Зарегистрируйтесь
                    </Link>
                </span>
            </div>

            <LoginForm />

            <div className='flex items-center gap-4'>
                <div className='flex-1 bg-shade_gray h-[1px] rounded-md' />
                <span className='text-shade_gray'>или с помощью</span>
                <div className='flex-1 bg-shade_gray h-[1px] rounded-md' />
            </div>

            <LoginVia />
        </div>
    );
};

export default LoginView;
