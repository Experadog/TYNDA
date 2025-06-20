'use client';

import { Link } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { Button, ImgMask, Translate } from '@components';
import Image from 'next/image';
import type { FC } from 'react';
import { FiArrowRight } from 'react-icons/fi';

interface IProps {
	heroViewModel: ViewModel['Home']['hero'];
}

const Hero: FC<IProps> = ({ heroViewModel }) => {
	return (
		<section className="relative w-full h-[500px] lg:h-[300px] overflow-hidden">
			<Image
				src="/home/herobg.webp"
				alt="Background"
				fill
				className="object-cover object-center"
				priority
				sizes="100vw"
				placeholder="blur"
				blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAAXNSR0IArs4c6QAAAKVJREFUGFcFwb8OwUAAwOHfqerVRWIhkTAKq1F4A7PJTGI08hKexFtILAYrC9E0/kSRNj1xxPk+0ZovrJI50veHRL/oVsvcU02UaLbhGTGcTW1OFSlVavywlFwHRIbNdsd6tUT0e217j7+40qfRrGNslvCw5xgcSbVGjAYdqzyJUnkcv0AQPAlPEcHlijEfxGTctr7rIaWD+VlujzeXKOb2SIkTwx9ILEgWXCodIwAAAABJRU5ErkJggg=="
			/>

			<ImgMask />

			<div className="relative z-10 h-full pl-10 lg:pl-5 pr-[250px] lg:pr-5 pb-[25px] lg:pb-8 flex flex-col justify-end gap-9 lg:gap-8 max-w-[964px]">
				<Translate direction="right" distance={100} animateOnce={false}>
					<h1 className="text-white text-6xl md:text-3xl font-bold uppercase tracking-[1.2px]">
						{heroViewModel.title}
					</h1>
				</Translate>

				<Translate direction="up" distance={60} animateOnce={false}>
					<Link href={`/${PAGES.ENTERPRISES_ALL}`} className="group w-max relative flex">
						<Button
							disableAnimation
							variant="yellow"
							className="h-[48px] lg:h-[38px] px-[22px] py-[14px] rounded-2xl flex items-center gap-2"
						>
							{heroViewModel.button}
							<FiArrowRight className="group-hover:translate-x-2 duration-300" />
						</Button>
					</Link>
				</Translate>
			</div>
		</section>
	);
};

export default Hero;
