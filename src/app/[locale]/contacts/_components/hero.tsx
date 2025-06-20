'use client';
import { BreadCrumbs } from '@/components/ui/breadCrumbs';
import Image from 'next/image';
import type { FC } from 'react';

interface IProps {
	heroViewModel: ViewModel['Contacts']['hero'];
}

const Hero: FC<IProps> = ({ heroViewModel }) => {
	return (
		<div className="mt-[50px] lg:mt-0 max-w-[1340px] m-auto px-14 lg:px-0">
			<BreadCrumbs home={heroViewModel.home} pageName={heroViewModel.title} />

			<div className="relative w-full h-[280px] lg:px-5 flex flex-col justify-center items-center gap-7 rounded-[25px] mt-[20px] lg:m-0 lg:rounded-none overflow-hidden">
				<div className="absolute inset-0">
					<Image
						src="/natureBG.webp"
						alt="Background Nature"
						fill
						sizes="700px"
						className="object-cover object-center"
						priority
						placeholder="blur"
						blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAAXNSR0IArs4c6QAAAI9JREFUGFcBhAB7/wGApMr/8/n8AP8DBgD6AQgA+e7lAAr12wAR9rwAFwT6AAGFlaT/KikvAP79+AD88eIArb/KAAgA4gAJ/NgAEgn0AAEbRXD/HBYOABUJ8gDY4NkA9PXxAAj+/ABAKvMALhsMAAE4Vhz/FBMzADspRgDU3ccA3Oa/AAcI+QAB/AAABP//AB81NlurJ06DAAAAAElFTkSuQmCC"
					/>
					<div className="absolute inset-0 bg-[rgba(9,9,9,0.4)]" />
				</div>

				<h2 className="relative uppercase text-white text-center text-6xl lg:text-3xl font-semibold lg:font-bold">
					{heroViewModel.title}
				</h2>
			</div>
		</div>
	);
};

export default Hero;
