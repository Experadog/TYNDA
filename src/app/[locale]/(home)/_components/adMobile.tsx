'use client';
import { Translate } from '@components';
import Image from 'next/image';
import type { FC } from 'react';

interface IProps {
	adMobileViewModel: ViewModel['Home']['adMobile'];
}

const AdMobile: FC<IProps> = ({ adMobileViewModel }) => {
	return (
		<div className="mt-[120px] lg:mt-[60px] grid grid-cols-2 lg:grid-cols-1 gap-[40px]">
			<Translate direction="right" distance={100} animateOnce={false}>
				<div className="bg-[var(--yellow)] rounded-[45px] pt-[25px] pl-[39px] pr-[22px] flex items-end justify-center">
					<Image
						priority
						src={'/home/telImg.webp'}
						alt="phone"
						width={540}
						height={699}
					/>
				</div>
			</Translate>
			<Translate
				direction="left"
				distance={100}
				animateOnce={false}
				className="flex items-center justify-center"
			>
				<div className="flex flex-col gap-[40px] max-w-[487px] lg:items-center lg:justify-center lg:gap-8">
					<h2 className="font-medium text-[34px] lg:text-2xl uppercase">
						{adMobileViewModel.title}
					</h2>
					<p className="text-base lg:text-sm font-normal">
						{adMobileViewModel.description1}
					</p>
					<p className="text-base lg:text-sm font-normal">
						{adMobileViewModel.description2}
					</p>
					<Translate direction="up" distance={50} animateOnce={false}>
						<div className="flex flex-col gap-[10px] mt-[30px] lg:mt-0 lg:justify-center lg:items-center">
							<p className="text-lg font-medium pr-[90px] lg:text-center lg:pr-0">
								{adMobileViewModel.links}
							</p>
							<div className="flex items-center gap-[10px]">
								<Image
									priority
									src={'/sm/appStore.webp'}
									alt="app store"
									width={128}
									height={43}
									className="cursor-pointer"
								/>
								<Image
									priority
									src={'/sm/googlePlay.webp'}
									alt="google"
									width={147}
									height={43}
									className="cursor-pointer h-[43px]"
								/>
							</div>
						</div>
					</Translate>
				</div>
			</Translate>
		</div>
	);
};

export default AdMobile;
