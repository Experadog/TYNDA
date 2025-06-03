'use client';
import type { EstablishmentDetailed } from '@/business-entities/establishment/EstablishmentEntity';
import { BreadCrumbs } from '@/components/ui/breadCrumbs';
import { Link, useRouter } from '@/i18n/routing';
import { PAGES, SOCIAL_MEDIAS, getTranslateByKey, isSuccessResponse } from '@/lib';
import { useLocale } from '@/providers/locale/locale-provider';
import { useUser } from '@/providers/user/user-provider';
import { createChat } from '@/services';
import type { SocialMediaKey } from '@common';
import { Button, LoadingSpinner } from '@components';
import clsx from 'clsx';
import Image from 'next/image';
import { type FC, useState } from 'react';
import { BsGeoAlt } from 'react-icons/bs';
import { GoClock } from 'react-icons/go';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { LiaPhoneSolid } from 'react-icons/lia';

interface IProps {
	viewModel: ViewModel['DetailEnterprise'];
	categoriesViewModel: ViewModel['Shared']['establishment_categories'];
	item: EstablishmentDetailed;
}

const Hero: FC<IProps> = ({ viewModel, item, categoriesViewModel }) => {
	const [shouldShowAllText, setShouldShowAllText] = useState(false);
	const { user } = useUser();
	const router = useRouter();
	const [isChatCreating, setIsChatCreating] = useState(false);

	const { locale } = useLocale();

	const description = getTranslateByKey(locale, item.translates, 'description');
	const isLongText = description.length > 300;

	const onCreateChat = async () => {
		if (!user) {
			router.push(PAGES.LOGIN);
			return;
		}

		setIsChatCreating(true);

		const response = await createChat({ establishment_id: item.id });

		if (isSuccessResponse(response)) {
			router.push(`${PAGES.PROFILE_CHAT}/${response.data.id}`);
		}

		setIsChatCreating(false);
	};

	return (
		<div className="mt-[50px] lg:mt-[30px]">
			<BreadCrumbs
				home={viewModel.hero.home}
				pageName={getTranslateByKey(locale, item.translates, 'name')}
			/>
			<div className="grid grid-cols-2 lg:grid-cols-1 items-start lg:items-center justify-between gap-7 mt-5">
				<div className="flex flex-col items-center justify-center gap-4">
					<Image
						src={item?.cover}
						priority
						alt="main image"
						width={650}
						height={520}
						className="rounded-[20px] lg:w-[353px] lg:h-[270px] object-cover"
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
								className="rounded-[10px] w-[205px] h-[170px] object-cover"
							/>
						))}
					</div>
				</div>

				<div className="flex flex-col gap-7 lg:items-start relative">
					<Button
						className="shadow-none absolute right-0 rounded-full size-12"
						variant={'yellow'}
						onClick={onCreateChat}
						size={'icon'}
					>
						{isChatCreating ? (
							<LoadingSpinner className="text-white" />
						) : (
							<IoChatbubbleEllipsesOutline className="text-white" />
						)}
					</Button>
					<h2 className="text-4xl font-medium lg:text-2xl lg:font-semibold">
						{getTranslateByKey(locale, item.translates, 'name')}
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
								<span className="text-base font-medium opacity-70">
									{item.contacts.phone?.split(';').join('')}
								</span>
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

						<div className="flex items-center gap-2">
							{Object.entries(item.contacts).map(([key, value]) => {
								const socialKey = key as SocialMediaKey;
								if (!value || socialKey === 'phone') return null;
								return (
									<Link
										key={socialKey}
										href={value}
										target="_blank"
										className="bg-yellow rounded-full p-2 hover:scale-105 transition-transform"
									>
										<Image
											width={16}
											height={16}
											alt={socialKey}
											src={SOCIAL_MEDIAS[socialKey].icon}
											className="h-4 w-4"
										/>
									</Link>
								);
							})}
						</div>
					</div>

					<div className="w-full">
						<h3 className="text-lg font-semibold uppercase lg:text-2xl">
							{viewModel.hero.aboutEnterprise}
						</h3>

						<p
							className={clsx(
								'text-base font-normal whitespace-pre-line max-w-full overflow-hidden',
								isLongText && !shouldShowAllText && 'truncate',
							)}
						>
							{isLongText
								? shouldShowAllText
									? description
									: `${description.slice(0, 300)}...`
								: description}
						</p>
						<button
							type="button"
							onClick={() => setShouldShowAllText((prev) => !prev)}
							className="mt-2 text-yellow font-medium hover:underline"
						>
							{isLongText
								? shouldShowAllText
									? `${viewModel.hero.hide_text}`
									: `${viewModel.hero.show_text}`
								: null}
						</button>
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
