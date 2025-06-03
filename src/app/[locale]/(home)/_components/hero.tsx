'use client';
import { Link } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { Button, Translate } from '@components';
import type { FC } from 'react';
import { FiArrowRight } from "react-icons/fi";

interface IProps {
	heroViewModel: ViewModel['Home']['hero'];
}

const Hero: FC<IProps> = ({ heroViewModel }) => {
	return (
		<div className="w-full">
			<div
				className="lg:rounded-none w-full h-[720px] lg:h-[630px] pl-10 lg:pl-5 flex flex-col justify-end gap-9 lg:gap-8 pb-[75px] lg:pb-8 bg-fixed bg-center bg-cover"
				style={{ backgroundImage: `url('/home/hero.webp')` }}
			>
				<div className="flex flex-col gap-[25px] max-w-[964px] pr-[250px] lg:pr-5">
					<Translate direction="right" distance={100} animateOnce={false}>
						<h1 className="text-white text-6xl md:text-3xl font-bold uppercase tracking-[1.2px]">
							{heroViewModel.title}
						</h1>
					</Translate>
					{/* <Translate direction="right" distance={200} animateOnce={false}>
						<p className="text-white text-base md:text-sm font-medium">
							{heroViewModel.description}
						</p>
					</Translate> */}
					<Translate direction="left" distance={60} animateOnce={false}>
						<Link href={`/${PAGES.ENTERPRISES_ALL}`}>
							<Button
								variant={'yellow'}
								className="h-[48px] px-[22px] py-[14px] rounded-[42px] flex items-center gap-2"
							>
								{heroViewModel.button}
								<FiArrowRight width={24} height={24} />
							</Button>
						</Link>
					</Translate>
				</div>
			</div>
		</div>
	);
};

export default Hero;
