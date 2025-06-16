'use client';
import Image from 'next/image';
import type { FC } from 'react';

interface IProps {
	firstService: ViewModel['Tariffs']['firstService'];
}

const FirstService: FC<IProps> = ({ firstService }) => {
	return (
		<div className="mt-[155px] mb-[100px] lg:mb-[60px] lg:py-8 lg:px-5 max-w-[1158px] m-auto rounded-[35px] bg-background_1 [box-shadow:0px_0px_15px_2px_rgba(41,53,61,0.2)] px-[116px] lg:shadow-none lg:rounded-none">
			<div className="grid grid-cols-2 lg:grid-cols-1 items-center gap-[130px] lg:gap-[50px]">
				<div className="flex flex-col gap-[60px]">
					<div className="flex items-center gap-5">
						<Image priority src={'/logo.svg'} alt="logo" width={69} height={66} />
						<p className="text-yellow text-6xl font-bold uppercase">TYNDA</p>
					</div>
					<p className="text-base font-semibold text-foreground_1">
						{firstService.text1}
						<span className="block">{firstService.text2}</span>
						<span className="block mt-[20px]">{firstService.text3}</span>
						<span className="block">{firstService.text4}</span>
					</p>
				</div>
				<div className="">
					<Image
						priority
						src={'/tariffs/earth2.png'}
						alt="earth"
						width={451}
						height={444}
						className="w-full"
					/>
				</div>
			</div>
		</div>
	);
};

export default FirstService;
