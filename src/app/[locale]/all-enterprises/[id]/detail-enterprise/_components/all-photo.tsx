'use client';
import { Link } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { Button, ImgViewer, Slider } from '@components';
import Image from 'next/image';
import type { FC } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { TbMapSearch } from 'react-icons/tb';
import { useDetailEnterpriseUseCase } from '../use-cases/useDetailEnterpriseUseCase';

interface IProps {
	viewModel: ViewModel['DetailEnterprise']['allPhoto'];
	imagesList: string[];
	disableMap?: boolean;
}

const AllPhoto: FC<IProps> = ({ imagesList, disableMap = false }) => {
	const { viewModel } = useDetailEnterpriseUseCase();

	return (
		<div className="mt-[80px] lg:mt-[30px] flex flex-col gap-7 mb-[50px]">
			<h3 className="text-3xl font-medium">{viewModel.allPhoto.photo}</h3>

			<div className="block lg:hidden">
				<div className="relative">
					{imagesList.length <= 4 ? (
						<div className="grid grid-cols-4 gap-4  justify-items-center">
							{imagesList.map((url, index) => (
								<div className="w-[290px] h-[208px] relative shrink-0" key={url}>
									<Image
										priority
										src={url}
										alt="photo"
										fill
										className="rounded-[15px] object-cover"
									/>
									<ImgViewer initialIndex={index} images={imagesList} />
								</div>
							))}
						</div>
					) : (
						<>
							<Slider
								key={'top-slider'}
								loop
								slidesPerView={4}
								spacing={20}
								navigation={{
									nextEl: '.category-slider-next',
									prevEl: '.category-slider-prev',
								}}
							>
								{imagesList.map((url, index) => (
									<div className="w-[290px] h-[208px] relative" key={url}>
										<Image
											priority
											src={url}
											alt="photo"
											fill
											className="rounded-[15px] object-cover"
										/>
										<ImgViewer initialIndex={index} images={imagesList} />
									</div>
								))}
							</Slider>

							<button
								key={'top-prev'}
								type="button"
								className="category-slider-prev absolute left-[-30px] top-1/2 -translate-y-1/2 z-10"
								aria-label="Previous"
							>
								<LuChevronLeft className="w-6 h-6 text-gray-600" />
							</button>
							<button
								key={'top-bottom'}
								type="button"
								className="category-slider-next absolute right-0 top-1/2 -translate-y-1/2 z-10"
								aria-label="Next"
							>
								<LuChevronRight className="w-6 h-6 text-gray-600" />
							</button>
						</>
					)}
				</div>
			</div>

			<div className="lg:flex flex-col gap-[10px] hidden relative">
				<Slider
					key={'bottom-slider'}
					loop
					slidesPerView={2}
					spacing={10}
					navigation={{
						nextEl: '.bottom-slider-next',
						prevEl: '.bottom-slider-prev',
					}}
				>
					{imagesList.map((url, index) => (
						<div className="w-full h-[130px] relative shrink-0" key={url}>
							<Image
								priority
								src={url}
								alt="photo"
								fill
								className="rounded-[10px] object-cover"
							/>
							<ImgViewer initialIndex={index} images={imagesList} />
						</div>
					))}
				</Slider>

				<button
					key={'bottom-prev'}
					type="button"
					className="bottom-slider-prev absolute top-1/2 -translate-y-1/2 z-10"
					aria-label="Previous"
				>
					<LuChevronLeft className="w-6 h-6 text-yellow" />
				</button>

				<button
					key={'bottom-next'}
					type="button"
					className="bottom-slider-next absolute right-0 top-1/2 -translate-y-1/2 z-10"
					aria-label="Next"
				>
					<LuChevronRight className="w-6 h-6 text-yellow" />
				</button>
			</div>

			{!disableMap && (
				<Link href={`/${PAGES.BENEFITS_MAP}`}>
					<Button
						className="rounded-2xl h-14 bg-yellow text-white text-base font-semibold w-full items-center gap-[10px] hidden lg:flex"
						variant={'yellow'}
						disableAnimation
					>
						Показать на карте <TbMapSearch />
					</Button>
				</Link>
			)}
		</div>
	);
};

export default AllPhoto;
