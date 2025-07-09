import { useViewModel } from '@/i18n/getTranslate';
import { Link } from '@/i18n/routing';
import { SOCIAL_MEDIAS, priceFormatter } from '@/lib';
import { useLocale } from '@/providers/locale/locale-provider';
import type { EstablishmentDetailed } from '@business-entities';
import type { SocialMediaKey } from '@common';
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
	PhoneLink,
} from '@components';
import clsx from 'clsx';
import Image from 'next/image';
import { type ReactNode, useState } from 'react';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { BsGeoAlt } from 'react-icons/bs';
import { GoClock } from 'react-icons/go';
import { LiaPhoneSolid } from 'react-icons/lia';
import { RiDiscountPercentLine } from 'react-icons/ri';

const EstablishmentPreview = ({
	item,
	trigger,
	height,
	title = true,
}: {
	item?: EstablishmentDetailed;
	trigger?: ReactNode;
	height?: string;
	title?: boolean;
}) => {
	if (!item) return null;

	const { locale } = useLocale();
	const { Shared, DetailEnterprise } = useViewModel(['Shared', 'DetailEnterprise']);
	const [shouldShowAllText, setShouldShowAllText] = useState(false);

	const { translates } = item;
	const isLongText = translates[locale].description.length > 300;

	return (
		<Drawer>
			{trigger || <DrawerTrigger className={'text-yellow'}>Посмотреть</DrawerTrigger>}

			<DrawerContent
				className={'bg-background_1 z-[999]'}
				style={{ border: 'none', height: height || '90%' }}
			>
				<DrawerHeader
					className={clsx(
						'justify-start relative',
						title ? 'border-b border-b-light_gray' : '',
					)}
				>
					<DrawerTitle className={clsx('text-2xl', title ? 'block' : 'hidden')}>
						Просмотр
					</DrawerTitle>
					<div className="w-[100px] h-1.5 bg-gray rounded-full absolute top-1 z-10 left-1/2 -translate-x-1/2" />
				</DrawerHeader>

				<div className="w-full px-8 lg:px-5 py-4 m-auto overflow-y-scroll overflow-x-hidden ">
					<div className="flex gap-5 lg:flex-col">
						<div className="order-2 lg:order-1 flex flex-col gap-6 relative w-full">
							<h2 className="text-4xl font-medium lg:text-2xl lg:font-semibold">
								{translates[locale].name}
							</h2>

							<p className="text-base font-medium numeric">
								<span className="mr-[10px] text-base font-semibold text-yellow">
									{Shared.establishment_categories[item.category]}
								</span>
								{item.address}
							</p>
							<div className="flex flex-col gap-4 text-sm">
								{item.address && (
									<div className="flex items-start gap-3">
										<BsGeoAlt className="size-5 mt-1 text-yellow shrink-0" />
										<div className="flex flex-col">
											<span className="font-medium sm:text-xs">
												{DetailEnterprise.hero.address}:
											</span>
											<span className="opacity-70 sm:text-xs break-words">
												{item.address}
											</span>
										</div>
									</div>
								)}

								{item.contacts.phone ? (
									<div className="flex items-start gap-3">
										<LiaPhoneSolid className="size-5 mt-1 text-yellow shrink-0" />
										<div className="flex flex-col">
											<span className="font-medium sm:text-xs">
												{DetailEnterprise.hero.contacts}:
											</span>

											<PhoneLink
												list={item.contacts.phone}
												className="opacity-70 sm:text-xs break-words"
											/>
										</div>
									</div>
								) : null}

								{item.work_time && (
									<div className="flex items-start gap-3">
										<GoClock className="size-5 mt-1 text-yellow shrink-0" />
										<div className="flex flex-col">
											<span className="font-medium sm:text-xs">
												{DetailEnterprise.hero.workTime}:
											</span>
											<span className="opacity-70 sm:text-xs">
												{item.work_time === '00:00-00:00'
													? '24/7'
													: item.work_time}
											</span>
										</div>
									</div>
								)}

								{item.discount > 0 && (
									<div className="flex items-start gap-3">
										<RiDiscountPercentLine className="size-5 mt-1 text-yellow shrink-0" />
										<div className="flex flex-col">
											<span className="font-medium sm:text-xs">
												{DetailEnterprise.hero.discount}:
											</span>
											<span className="opacity-70 sm:text-xs">
												{item.discount}%
											</span>
										</div>
									</div>
								)}

								{item.average_bill && (
									<div className="flex items-start gap-3">
										<AiOutlineDollarCircle className="size-5 mt-1 text-yellow shrink-0" />
										<div className="flex flex-col">
											<span className="font-medium sm:text-xs">
												{DetailEnterprise.hero.average_bill}:
											</span>
											<span className="opacity-70 sm:text-xs">
												{priceFormatter(item.average_bill, 'сом')}
											</span>
										</div>
									</div>
								)}

								<div className="flex flex-wrap justify-end items-center gap-2">
									{Object.entries(item.contacts).map(([key, value]) => {
										const socialKey = key as SocialMediaKey;
										if (socialKey === 'phone' || typeof value !== 'string')
											return null;

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
												/>
											</Link>
										);
									})}
								</div>
							</div>

							<div className="flex flex-col gap-3">
								<h3 className="text-lg font-semibold uppercase lg:text-base text-foreground_2">
									{DetailEnterprise.hero.aboutEnterprise}
								</h3>

								<div className="w-full h-[1px] bg-foreground_2 rounded-md" />

								<p
									className={clsx(
										'text-base lg:text-sm font-normal whitespace-pre-line text-foreground_2',
										isLongText && !shouldShowAllText
											? 'line-clamp-3'
											: 'line-clamp-none',
									)}
								>
									{translates[locale].description}
								</p>
								{isLongText && (
									<button
										type="button"
										onClick={() => setShouldShowAllText((prev) => !prev)}
										className="mt-2 text-yellow font-medium hover:underline text-sm self-start"
									>
										{shouldShowAllText
											? DetailEnterprise.hero.hide_text
											: DetailEnterprise.hero.show_text}
									</button>
								)}
							</div>
						</div>

						<div className="order-1 lg:order-2 flex flex-col items-center gap-4  flex-shrink-0">
							<div className="w-full h-[520px] lg:w-full lg:h-[220px] relative rounded-[20px] overflow-hidden">
								<Image
									src={item.cover}
									priority
									alt="main image"
									fill
									className="object-cover"
								/>
							</div>

							<div className="grid grid-cols-3 items-center gap-4 lg:grid-cols-2 lg:gap-2 w-full">
								{item.images.slice(0, 2).map((url) => (
									<div
										key={url}
										className="w-[205px] h-[170px] lg:w-full lg:h-[120px] relative rounded-[10px] overflow-hidden"
									>
										<Image
											src={url}
											priority
											alt="image"
											fill
											className="object-cover"
										/>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="mt-10 mb-5">
						<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
							Фотографии
						</h3>
						<div className="grid grid-cols-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-4">
							{[item.cover, ...item.images].map((src) => (
								<div
									key={src}
									className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md"
								>
									<Image
										src={src}
										alt="gallery photo"
										fill
										className="object-cover"
										sizes="(max-width: 640px) 33vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default EstablishmentPreview;
