'use client';
import { ImgMask } from '@components';
import Image from 'next/image';
import type { FC } from 'react';

interface IProps {
	heroViewModel: ViewModel['Tariffs']['hero'];
}

const Hero: FC<IProps> = ({ heroViewModel }) => {
	return (
		<div className="mt-[10px] lg:mt-0 max-w-[1420px] m-auto px-[10px] lg:px-0">
			<div className="relative w-full h-[586px] lg:h-[403px] lg:px-5 flex flex-col justify-center items-center gap-7 rounded-[25px] mt-[20px] lg:m-0 lg:rounded-none overflow-hidden">
				<Image
					src="/tariffs/tariffsBg.webp"
					alt="Background"
					fill
					priority
					sizes="800px"
					className="object-cover object-center"
					placeholder="blur"
					blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAAXNSR0IArs4c6QAAAJ5JREFUGFcFwU0OwUAAgNFvtFiLlISd29ixcgSu4Dx29lzDgpWQtEpSbdOZ/hiq2vGe2B9OptO2ibIX97TATRS+zAhUSqQUYnc4GjcIeYQxo+GACkGQFRzPF7wwRkxnc9PtO1SWja4bWvWPMg6pcsXnpRGL5cpY4wnp90ddanrOgKd/Q3lXUikR683W1E1DlEhEu4PSmuJTkus3Ms/5A3Q/W2/ytErJAAAAAElFTkSuQmCC"
				/>
				<ImgMask />

				<h2 className="relative uppercase text-white text-center text-5xl lg:text-3xl font-semibold lg:font-bold">
					{heroViewModel.title}
				</h2>
				<h3 className="relative text-lg font-normal text-center max-w-[634px] text-white lg:text-sm">
					{heroViewModel.description}
				</h3>
			</div>
		</div>
	);
};

export default Hero;
