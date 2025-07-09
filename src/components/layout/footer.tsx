'use client';
import { Link, usePathname } from '@/i18n/routing';
import { PAGES, SOCIAL_MEDIAS } from '@/lib';
import clsx from 'clsx';
import Image from 'next/image';
import type { FC } from 'react';
import Translate from '../animation/translate/translate';
import { useFooterUseCase } from './use-cases/useFooterUseCase';

interface IProps {
	viewModel: ViewModel['Layout']['footer'];
}

const Footer: FC<IProps> = () => {
	const { viewModel, sectionUrls } = useFooterUseCase();
	const path = usePathname();

	const footer_hidden_pages = [PAGES.UPDATE_PROFILE, PAGES.DASHBOARD, PAGES.BENEFITS_MAP];

	const isFooterHidden = footer_hidden_pages.some((hiddenPath) => path.startsWith(hiddenPath));
	const className = isFooterHidden ? 'hidden' : '';

	return (
		<footer
			id="footer"
			className={clsx('bg-background_4 px-6 py-12 lg:px-4 lg:py-10', className)}
		>
			<Translate
				direction="up"
				animateOnce={false}
				duration={2}
				className={'"max-w-screen-2xl mx-auto flex flex-col gap-10'}
			>
				<div className="flex justify-between flex-wrap gap-8 lg:flex-col lg:items-center lg:gap-10">
					<div className="flex-shrink-0 self-center w-[120px] h-[90px] relative">
						<Image src="/logo.svg" alt="Логотип" fill className="object-contain" />
					</div>

					{/* Меню */}
					<div className="flex gap-16 flex-wrap justify-center text-center lg:flex-col lg:items-center">
						{viewModel.footer.menu.map((section, sectionIndex) => (
							<div key={section.title} className="min-w-[140px] flex flex-col gap-4">
								<p className="uppercase text-sm font-semibold text-foreground_1 tracking-widest">
									{section.title}
								</p>
								<ul className="flex flex-col gap-2 text-foreground_1 text-base font-normal">
									{section.items.map((item, itemIndex) => (
										<Link
											key={item}
											href={sectionUrls[sectionIndex][itemIndex]}
											className="hover:text-yellow transition-colors duration-200"
										>
											<li>{item}</li>
										</Link>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				<div className="flex justify-between items-center flex-wrap gap-4 border-t border-shade_gray pt-6">
					<p className="text-sm text-foreground_1">
						© {new Date().getFullYear()} Все права защищены
					</p>
					<div className="flex gap-4">
						<Link
							href={SOCIAL_MEDIAS.telegram.link}
							target="_blank"
							rel="noopener noreferrer"
							className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
						>
							<Image
								src={SOCIAL_MEDIAS.telegram.icon}
								alt="social icon"
								width={20}
								height={20}
							/>
						</Link>

						<Link
							href={SOCIAL_MEDIAS.whatsApp.link}
							target="_blank"
							rel="noopener noreferrer"
							className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
						>
							<Image
								src={SOCIAL_MEDIAS.whatsApp.icon}
								alt="social icon"
								width={20}
								height={20}
							/>
						</Link>

						<Link
							href={SOCIAL_MEDIAS.instagram.link}
							target="_blank"
							rel="noopener noreferrer"
							className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
						>
							<Image
								src={SOCIAL_MEDIAS.instagram.icon}
								alt="social icon"
								width={20}
								height={20}
							/>
						</Link>
					</div>
				</div>
			</Translate>
		</footer>
	);
};

export default Footer;
