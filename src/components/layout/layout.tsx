'use client';

import { useViewModel } from '@/i18n/getTranslate';
import type { FC, ReactNode } from 'react';
import Footer from './footer';
import Navbar from './navbar';

interface IProps {
	children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
	const viewModel = useViewModel(['Layout']);

	return (
		<main className="flex flex-col relative">
			<Navbar viewModel={viewModel.navbar} />
			<div className="overflow-y-auto overflow-x-hidden mt-[88px] full-height">
				{children}
			</div>
			<Footer viewModel={viewModel.footer} />
		</main>
	);
};

export default Layout;
