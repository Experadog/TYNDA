'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { usePathname } from '@/i18n/routing';
import { PAGES } from '@/lib';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import Footer from './footer';
import Navbar from './navbar';

interface IProps {
	children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
	const viewModel = useViewModel(['Layout']);
	const pathname = usePathname();
	const isDashboard = pathname.includes(PAGES.DASHBOARD);

	return (
		<main className="flex flex-col relative">
			{!isDashboard && <Navbar viewModel={viewModel.navbar} />}
			<div
				className={clsx(
					'overflow-y-auto overflow-x-hidden full-height',
					!isDashboard ? 'mt-[88px]' : 'mt-0',
				)}
			>
				{children}
			</div>
			{!isDashboard && <Footer viewModel={viewModel.footer} />}
		</main>
	);
};

export default Layout;
