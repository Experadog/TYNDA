'use client';
import { Button, Slider } from '@components';
import Image from 'next/image';
import type { FC } from 'react';
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
				<Slider loop slidesPerView={4} spacing={20}>
					{imagesList.map((url) => {
						return (
							<div key={url}>
								<Image
									src={url}
									alt="photo"
									width={290}
									height={208}
									className="rounded-[15px]"
								/>
							</div>
						);
					})}
				</Slider>
			</div>
			<div className="lg:flex flex-col gap-[10px] hidden">
				<div className="flex gap-[10px]">
					<Image
						src="/enterprisesBg.webp"
						alt="photo"
						width={220}
						height={250}
						className="rounded-[10px] min-h-[250px]"
					/>
					<div className="flex flex-col gap-[10px]">
						<Image
							src="/enterprisesBg.webp"
							alt="photo"
							width={123}
							height={120}
							className="rounded-[10px]"
						/>
						<Image
							src="/enterprisesBg.webp"
							alt="photo"
							width={123}
							height={120}
							className="rounded-[10px]"
						/>
					</div>
				</div>
				<div className="max-w-[353px]">
					<Slider loop slidesPerView={3} spacing={10}>
						{imagesList.map((url) => {
							return (
								<Image
									key={url}
									src={url}
									alt="photo"
									width={111}
									height={108}
									className="rounded-[10px]"
								/>
							);
						})}
					</Slider>
				</div>
			</div>
			<div className="flex items-center justify-center max-w-[353px]">
				<Button className="rounded-2xl hidden lg:block h-14 bg-yellow text-white text-base font-semibold w-full">
					Показать все фото
				</Button>
			</div>
			<div className="hidden lg:flex items-center justify-center max-w-[353px] bg-background_1 p-[15px] rounded-[15px] shadow-[0_0_15px_2px_rgba(41,53,61,0.20)]">
				<Button className="rounded-2xl flex h-14 bg-yellow text-white text-base font-semibold w-full items-center gap-[10px] ">
					Показать на карте <TbMapSearch />
				</Button>
			</div>
		</div>
	);
};

export default AllPhoto;
