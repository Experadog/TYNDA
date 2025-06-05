'use client';
import { Link } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { Button, ImgMask, Translate } from '@components';
import type { FC } from 'react';
import { FiArrowRight } from 'react-icons/fi';

interface IProps {
	heroViewModel: ViewModel['Home']['hero'];
}

const Hero: FC<IProps> = ({ heroViewModel }) => {
	return (
		<div className="w-full">
			<div
				className="w-full h-[400px] lg:h-[300px] pl-10 lg:pl-5 flex flex-col justify-end gap-9 lg:gap-8 pb-[25px] lg:pb-8
		bg-cover bg-no-repeat bg-fixed xl:bg-scroll relative overflow-hidden"
				style={{ backgroundImage: `url('/home/hero.webp')` }}
			>
				<ImgMask />
				<div className="flex flex-col gap-[20px] max-w-[964px] pr-[250px] lg:pr-5 ">
					<Translate direction="right" distance={100} animateOnce={false}>
						<h1 className="text-white text-6xl md:text-3xl font-bold uppercase tracking-[1.2px]">
							{heroViewModel.title}
						</h1>
					</Translate>

					<Translate direction="up" distance={60} animateOnce={false}>
						<Link
							href={`/${PAGES.ENTERPRISES_ALL}`}
							className="group w-max relative flex"
						>
							<Button
								disableAnimation
								variant={'yellow'}
								className="h-[48px] px-[22px] py-[14px]  rounded-2xl flex items-center gap-2"
							>
								{heroViewModel.button}
								<FiArrowRight
									width={24}
									height={24}
									className="group-hover:translate-x-2 duration-300"
								/>
							</Button>
						</Link>
					</Translate>
				</div>
			</div>
		</div>
	);
};

export default Hero;
