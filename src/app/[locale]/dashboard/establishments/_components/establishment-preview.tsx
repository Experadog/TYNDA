import { useViewModel } from '@/i18n/getTranslate';
import { Link } from '@/i18n/routing';
import { SOCIAL_MEDIAS } from '@/lib';
import { useLocale } from '@/providers/locale/locale-provider';
import type { EstablishmentDetailed } from '@business-entities';
import type { SocialMediaKey } from '@common';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@components';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { BsGeoAlt } from 'react-icons/bs';
import { GoClock } from 'react-icons/go';
import { LiaPhoneSolid } from 'react-icons/lia';

const EstablishmentPreview = ({ item }: { item?: EstablishmentDetailed }) => {
	if (!item) return null;

	const { locale } = useLocale();
	const { Shared, DetailEnterprise } = useViewModel(['Shared', 'DetailEnterprise']);
	const [shouldShowAllText, setShouldShowAllText] = useState(false);

	const { translates } = item;
	const isLongText = translates[locale].description.length > 300;

	return (
		<Drawer>
			<DrawerTrigger className="text-yellow">Посмотреть</DrawerTrigger>
			<DrawerContent className="bg-background_1 h-[90%]" style={{ border: 'none' }}>
				<DrawerHeader className="justify-start border-b border-b-light_gray">
					<DrawerTitle className="text-2xl">Просмотр</DrawerTitle>
				</DrawerHeader>

				<div className="w-full px-8 lg:px-5 py-4 m-auto overflow-y-scroll ">
					<div className="flex gap-5 lg:flex-col">
						<div className="order-2 lg:order-1 flex flex-col gap-6 relative">
							<h2 className="text-4xl font-medium lg:text-2xl lg:font-semibold">
								{translates[locale].name}
							</h2>

							<p className="text-lg font-medium numeric lg:text-base">
								<span className="mr-[10px] text-lg font-semibold">
									{Shared.establishment_categories[item.category]}
								</span>
								{item.address}
							</p>

							<div className="flex flex-col gap-4  shadow-md rounded-[15px] text-sm p-3 bg-background_6">
								<p className="flex items-start gap-3 numeric">
									<BsGeoAlt className="size-5 text-yellow" />
									<span className="font-medium sm:text-xs">
										{DetailEnterprise.hero.address}:
									</span>
									<span className="opacity-70 sm:text-xs">{item.address}</span>
								</p>
								<p className="flex items-start gap-3 numeric">
									<LiaPhoneSolid className="size-5 text-yellow" />
									<span className="font-medium sm:text-xs">
										{DetailEnterprise.hero.contacts}:
									</span>
									<span className="opacity-70 sm:text-xs">
										{item.contacts.phone?.split(';').join('')}
									</span>
								</p>
								<p className="flex items-start gap-3 numeric">
									<GoClock className="size-5 text-yellow" />
									<span className="font-medium sm:text-xs">
										{DetailEnterprise.hero.workTime}:
									</span>
									<span className="opacity-70 sm:text-xs">
										{item.work_time === '00:00-00:00' ? '24/7' : item.work_time}
									</span>
								</p>

								<div className="flex flex-wrap items-center gap-2">
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
												/>
											</Link>
										);
									})}
								</div>
							</div>

							<div>
								<h3 className="text-lg font-semibold uppercase lg:text-base">
									{DetailEnterprise.hero.aboutEnterprise}
								</h3>
								<p
									className={clsx(
										'text-base lg:text-sm font-normal whitespace-pre-line',
										isLongText && !shouldShowAllText && 'line-clamp-5',
									)}
								>
									{translates[locale].description}
								</p>
								{isLongText && (
									<button
										type="button"
										onClick={() => setShouldShowAllText((prev) => !prev)}
										className="mt-2 text-yellow font-medium hover:underline text-sm"
									>
										{shouldShowAllText
											? DetailEnterprise.hero.hide_text
											: DetailEnterprise.hero.show_text}
									</button>
								)}
							</div>
						</div>

						<div className="order-1 lg:order-2 flex flex-col items-center gap-4   flex-shrink-0">
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
									className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md cursor-pointer"
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
