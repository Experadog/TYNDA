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
        <main className='flex flex-col'>
            <Navbar viewModel={viewModel.navbar} />
            {children}
            <Footer viewModel={viewModel.footer} />
            {/* <FpsShow /> */}
        </main>
    );
};

export default Layout;
