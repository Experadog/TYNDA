'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { FC, ReactNode } from 'react';
import Footer from './footer';
import Navbar from './navbar';

interface IProps {
    children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
    const viewModel = useViewModel(['Layout']);

    return (
        <main className='flex flex-col relative'>
            <Navbar viewModel={viewModel.navbar} />
            <div style={{ minHeight: `calc(100vh - 88px)`, overflowY: 'auto', overflowX: 'hidden' }}>{children}</div>
            <Footer viewModel={viewModel.footer} />
        </main>
    );
};

export default Layout;
