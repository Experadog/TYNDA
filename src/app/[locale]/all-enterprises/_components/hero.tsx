'use client';
import { BreadCrumbs } from '@/components/ui/breadCrumbs';
import { EstCategorySlider } from '@components';
import type { FC } from 'react';
import { useMediaQuery } from 'react-responsive';

interface IProps {
	heroViewModel: ViewModel['AllEnterprises']['hero'];
	categoriesViewModel: ViewModel['Shared']['establishment_categories'];
}

const Hero: FC<IProps> = ({ heroViewModel, categoriesViewModel }) => {
	const isLargeScreen = useMediaQuery({ minWidth: 1025 });
	const isSmallScreen = useMediaQuery({ minWidth: 440 });

	const itemsCount = isLargeScreen ? 7 : isSmallScreen ? 4 : 3;
	const itemsSpacing = isLargeScreen ? 15 : 20;

	return (
		<div className="mt-[50px] lg:mt-0 max-w-[1340px] m-auto px-14 lg:px-0">
			<BreadCrumbs home={heroViewModel.home} pageName={heroViewModel.allEnterprises} />
			<div className='w-full h-[280px] lg:px-5 flex flex-col justify-center items-center gap-7 rounded-[25px] mt-[20px] lg:m-0 lg:rounded-none bg-[linear-gradient(0deg,rgba(9,9,9,0.60)_0%,rgba(9,9,9,0.60)_100%),url("/enterprisesBg.webp")] lg:bg-[linear-gradient(0deg,rgba(9,9,9,0.50)_0%,rgba(9,9,9,0.50)_100%),url("/enterprisesBg.webp")] bg-cover bg-center bg-no-repeat'>
				<h2 className="uppercase text-white text-center text-6xl lg:text-3xl font-semibold lg:font-bold">
					{heroViewModel.explore}
				</h2>
				<p className="text-white text-lg lg:text-sm font-normal text-center max-w-[634px]">
					{heroViewModel.openNew}
				</p>
			</div>

			<EstCategorySlider
				onSelect={(category) => console.log(category)}
				slidesPerView={itemsCount}
				spacing={itemsSpacing}
				viewModel={categoriesViewModel}
			/>
		</div>
	);
};

export default Hero;
