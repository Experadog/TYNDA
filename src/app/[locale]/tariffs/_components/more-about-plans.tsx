'use client';
import { Button } from '@components';
import Image from 'next/image';
import type { FC } from 'react';

type IProps = {
	moreAboutPlansViewModel: ViewModel['Tariffs']['moreAboutPlans']
};

const MoreAboutPlans: FC<IProps> = ({ moreAboutPlansViewModel }) => {
	return (
		<div className="mt-[120px] lg:mt-[60px] lg:px-5">
			<div className="flex flex-col items-center">
				<h3 className="text-5xl font-semibold lg:text-4xl lg:text-center">
					{moreAboutPlansViewModel.more}
				</h3>
				<div className="flex items-center justify-center mt-[44px]">
					<Button
						variant={'yellow'}
						className="rounded-[42px] px-[22px] py-[14px] h-[52px] flex items-center text-base font-semibold"
					>
						{moreAboutPlansViewModel.download}
					</Button>
				</div>
				<div className="flex flex-col gap-[10px] mt-[30px] lg:mt-6 justify-center items-center">
					<p className="text-lg font-medium text-center">{moreAboutPlansViewModel.availableAt}</p>
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
							width={128}
							height={43}
							className="cursor-pointer h-[43px]"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MoreAboutPlans;
