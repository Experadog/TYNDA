'use client';
import type { EstablishmentDetailed } from '@/business-entities/establishment/EstablishmentEntity';
import { BreadCrumbs } from '@/components/ui/breadCrumbs';
import Image from 'next/image';
import type { FC } from 'react';
import { BsGeoAlt } from 'react-icons/bs';
import { GoClock } from 'react-icons/go';
import { LiaPhoneSolid } from 'react-icons/lia';


interface IProps {
	viewModel: ViewModel['DetailEnterprise'];
	categoriesViewModel: ViewModel['Shared']['establishment_categories'];
	item: EstablishmentDetailed;
}

const Hero: FC<IProps> = ({ viewModel, item, categoriesViewModel }) => {
	return (
		<div className="mt-[50px] lg:mt-[30px]">
			<BreadCrumbs home={viewModel.hero.home} pageName={item?.translates?.ru?.name || ''} />
			<div className="grid grid-cols-2 lg:grid-cols-1 items-start lg:items-center justify-between gap-7 mt-5">
				<div className="flex flex-col items-center justify-center gap-4">
					<Image
						src={item?.cover}
						priority
						alt="main image"
						width={650}
						height={520}
						className="rounded-[20px] w-[650px] h-[520px] lg:w-[353px] lg:h-[270px]"
					/>
					<div className="grid grid-cols-3 items-center gap-4 lg:hidden">
						{item.images.slice(0, 3).map((url) => (
							<Image
								key={url}
								src={url}
								priority
								alt="image"
								width={205}
								height={170}
								className="rounded-[10px] w-[205px] h-[170px]"
							/>
						))}
					</div>
				</div>

				<div className="flex flex-col gap-7 lg:items-start">
					<h2 className="text-4xl font-medium lg:text-2xl lg:font-semibold">
						{item?.translates?.ru?.name}
					</h2>
					<div className="flex flex-col gap-4">
						<p className="text-lg font-medium numeric">
							<span className="mr-[10px] text-lg font-semibold">
								{categoriesViewModel[item.category]}
							</span>
							{item.address}
						</p>
						{/* <p className='flex gap-2 items-center numeric'>
								<span>
										<IoStar className='text-[var(--yellow)] md:text-sm' />
								</span>
								<span className='flex items-center text-lg lg:text-base font-medium'>
										<span className='text-lg font-semibold'>4.9</span>
										<LuDot className='text-xl' />
										18 отзывов
								</span>
						</p> */}
					</div>
					<div className="flex flex-col gap-4 px-5 lg:px-[10px] py-4 shadow-[0_0_15px_2px_rgba(41,53,61,0.20)] rounded-[15px] bg-background_1">
						<div>
							<p className="flex items-center gap-4 py-2 numeric">
								<span>
									<BsGeoAlt className="w-6 h-6 text-yellow" />
								</span>
								<span className="text-base font-medium">
									{viewModel.hero.address}
								</span>
								<span className="text-base font-medium opacity-70">
									{item?.address}
								</span>
							</p>
						</div>
						<div>
							<p className="flex items-center gap-4 py-2 numeric">
								<span>
									<LiaPhoneSolid className="w-6 h-6 text-yellow" />
								</span>
								<span className="text-base font-medium">
									{viewModel.hero.contacts}
								</span>
								<a href={item?.contacts?.phone} className="text-base font-medium opacity-70">
									{item?.contacts?.phone.replace(/^tel:/, '')}
								</a>
							</p>
						</div>
						<div>
							<p className="flex items-center gap-4 py-2 numeric">
								<span>
									<GoClock className="w-6 h-6 text-yellow" />
								</span>
								<span className="text-base font-medium">
									{viewModel.hero.workTime}
								</span>
								<span className="text-base font-medium opacity-70">
									{item?.work_time}
								</span>
							</p>
						</div>
					</div>

					<div className="max-w-[650px]">
						<h3 className="text-lg font-semibold uppercase lg:text-2xl">
							{viewModel.hero.aboutEnterprise}
						</h3>
						{item?.translates?.ru?.description && (
							<p className="text-base font-normal">
								{item?.translates?.ru?.description}
							</p>
						)}
					</div>
					{/* <div className='flex items-center justify-between w-full gap-3 lg:hidden'>
                        <Button className='rounded-[25px] w-full text-yellow bg-background_1 border  border-yellow hover:text-white hover:bg-yellow h-12 text-lg font-semibold'>{viewModel.hero.button1}</Button>
                        <Button className='flex items-center gap-[10px] rounded-[25px] w-full text-yellow bg-background_1 border  border-yellow hover:text-white hover:bg-yellow h-12 text-lg font-semibold'>
                            <TbMapSearch />
                            {viewModel.hero.button2}
                        </Button>
                    </div> */}
				</div>
			</div>
		</div>
	);
};

export default Hero;
