'use client';
import { Link } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { Button, Slider } from '@components';
import Image from 'next/image';
import type { FC } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { TbMapSearch } from 'react-icons/tb';
import { useDetailEnterpriseUseCase } from '../use-cases/useDetailEnterpriseUseCase';

interface IProps {
	viewModel: ViewModel['DetailEnterprise']['allPhoto'];
	imagesList: string[];
}

const AllPhoto: FC<IProps> = ({ imagesList }) => {
	const { viewModel } = useDetailEnterpriseUseCase();

	return (
		<div className="mt-[80px] lg:mt-[30px] flex flex-col gap-7 mb-[100px]">
			<h3 className="text-3xl font-medium lg:hidden">{viewModel.allPhoto.photo}</h3>
			<div className="block lg:hidden">
				<div className="relative">
					<Slider loop slidesPerView={4} spacing={20} navigation={{
						nextEl: '.category-slider-next',
						prevEl: '.category-slider-prev',
					}}>
						{imagesList.map((url) => {
							return (
								<div className="w-[290px] h-[208px] relative" key={url}>
									<Image
										priority
										src={url}
										alt="photo"
										fill
										className="rounded-[15px] object-cover"
									/>
								</div>
							);
						})}
					</Slider>
					<button
						className="category-slider-prev absolute left-[-30px] top-1/2 -translate-y-1/2 z-10"
						aria-label="Previous"
					>
						<LuChevronLeft className="w-6 h-6 text-gray-600" />
					</button>
					<button
						className="category-slider-next absolute right-0 top-1/2 -translate-y-1/2 z-10"
						aria-label="Next"
					>
						<LuChevronRight className="w-6 h-6 text-gray-600" />
					</button>
				</div>
			</div>
			<div className="lg:flex flex-col gap-[10px] hidden">
				<div className="flex gap-[10px]">
					<div className="w-[220px] h-[250px] relative">
						<Image
							priority
							src={imagesList[0]}
							alt="photo"
							fill
							className="rounded-[10px] object-cover"
						/>
					</div>
					<div className="flex flex-col gap-[10px]">
						{imagesList.slice(1, 3).map((url) => (
							<div key={url} className="w-[123px] h-[120px] relative">
								<Image
									priority
									src={url}
									alt="photo"
									fill
									className="rounded-[10px] object-cover"
								/>
							</div>
						))}
					</div>
				</div>
				<div className="w-full">
					<Slider loop slidesPerView={3} spacing={10}>
						{imagesList.map((url) => {
							return (
								<div key={url} className="w-[108px] h-[108px]">
									<Image
										priority
										key={url}
										src={url}
										alt="photo"
										width={111}
										height={108}
										className="rounded-[10px] w-full h-[108px] object-cover"
									/>
								</div>
							);
						})}
					</Slider>
				</div>
			</div>
			{/* <div className="flex items-center justify-center max-w-[353px]">
				<Button className="rounded-2xl hidden lg:block h-14 bg-yellow text-white text-base font-semibold w-full">
					Показать все фото
				</Button>
			</div> */}
			<Link href={`/${PAGES.BENEFITS_MAP}`}>
				<div className="hidden lg:flex items-center justify-center max-w-[353px] bg-background_1 p-[15px] rounded-[15px] shadow-[0_0_15px_2px_rgba(41,53,61,0.20)]">
					<Button className="rounded-2xl flex h-14 bg-yellow text-white text-base font-semibold w-full items-center gap-[10px] ">
						Показать на карте <TbMapSearch />
					</Button>
				</div>
			</Link>
		</div>
	);
};

export default AllPhoto;
