'use client';
import { Link, usePathname } from '@/i18n/routing';
import { PAGES } from '@/lib';
import clsx from 'clsx';
import Image from 'next/image';
import type { FC } from 'react';
import { useFooterUseCase } from './use-cases/useFooterUseCase';

const icons = [
	{ id: 0, src: '/sm/telegram.svg', alt: 'telegram icon' },
	{ id: 1, src: '/sm/whatsapp.svg', alt: 'whatsapp icon' },
	{ id: 2, src: '/sm/instagram.svg', alt: 'instagram icon' },
];

interface IProps {
	viewModel: ViewModel['Layout']['footer'];
}

const Footer: FC<IProps> = () => {
	const { viewModel, sectionUrls } = useFooterUseCase();
	const path = usePathname();

	const className =
		path.startsWith(PAGES.UPDATE_PROFILE) || path === PAGES.DASHBOARD ? 'hidden' : '';

	return (
		<footer
			id="footer"
			className={clsx(
				'bg-background_4 py-[60px] pl-[60px] lg:pt-20 lg:px-5 lg:pb-24',
				className,
			)}
		>
			<div className="max-w-[1920px] m-auto flex flex-col lg:gap-[30px]">
				<div className="flex justify-between gap-4 lg:flex-col lg:gap-[50px]">
					<div className="flex flex-col gap-[25px] w-[433px] lg:w-auto">
						<Image src={'/logo.svg'} alt="logo" width={120} height={90} />
					</div>
					<div className="flex gap-[50px] lg:flex-col">
						{viewModel.footer.menu.map((section, sectionIndex) => (
							<div key={section.title} className="flex flex-col gap-6 min-w-56">
								<p className="uppercase text-[15px] font-medium opacity-60 whitespace-nowrap">
									{section.title}
								</p>
								<ul className="flex flex-col gap-[10px] font-normal text-base">
									{section.items.map((item, itemIndex) => (
										<Link
											key={item}
											href={sectionUrls[sectionIndex][itemIndex]}
											className="hover:text-yellow max-w-max"
										>
											<li className="whitespace-nowrap">{item}</li>
										</Link>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex gap-[15px]">
						{icons.map((item) => (
							<div
								key={item.id}
								className="bg-[#E9BC1B] rounded-[40px] w-10 h-10 flex items-center justify-center cursor-pointer transition duration-200 hover:scale-110 active:scale-90"
							>
								<Image src={item.src} alt="social icon" width={20} height={20} />
							</div>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
