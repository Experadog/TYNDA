'use client';
import { BreadCrumbs } from '@/components/ui/breadCrumbs';
import type { FC } from 'react';

interface IProps {
	heroViewModel: ViewModel['AllEnterprises']['hero'];

}

const Hero: FC<IProps> = ({ heroViewModel }) => {
	return (
		<div className="mt-[50px] lg:mt-0 max-w-[1340px] m-auto px-14 lg:px-0">
			<BreadCrumbs home={heroViewModel.home} pageName={heroViewModel.allEnterprises} />
			<div className='w-full h-[280px] lg:px-5 flex flex-col justify-center items-center gap-7 rounded-[25px] mt-[20px] lg:m-0 lg:rounded-none bg-[linear-gradient(0deg,rgba(9,9,9,0.40)_0%,rgba(9,9,9,0.40)_100%),url("/natureBG.webp")] lg:bg-[linear-gradient(0deg,rgba(9,9,9,0.40)_0%,rgba(9,9,9,0.40)_100%),url("/natureBG.webp")] bg-cover bg-center bg-no-repeat'>
				<h2 className="uppercase text-white text-center text-6xl lg:text-3xl font-semibold lg:font-bold">
					{heroViewModel.explore}
				</h2>
				<p className="text-white text-lg lg:text-sm font-normal text-center max-w-[634px]">
					{heroViewModel.openNew}
				</p>
			</div>
		</div>
	);
};

export default Hero;
