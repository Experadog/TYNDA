'use client';
import type { EstablishmentDetailed } from '@/business-entities/establishment/EstablishmentEntity';
import { BreadCrumbs } from '@/components/ui/breadCrumbs';
import { Link, useRouter } from '@/i18n/routing';
import { PAGES, SOCIAL_MEDIAS, URL_ENTITIES, getTranslateByKey } from '@/lib';
import { useChatWebSocket } from '@/providers/chat-webscoket/chat-webscoket-provider';
import { useLocale } from '@/providers/locale/locale-provider';
import { useUser } from '@/providers/user/user-provider';
import { createChat } from '@/services';
import { type SocialMediaKey, createAction, revalidateByTags } from '@common';
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

	const { connectWebSocket } = useChatWebSocket();

	const description = getTranslateByKey(locale, item.translates, 'description');
	const isLongText = description.length > 300;

	const action = createAction({
		requestAction: createChat,
		onSuccess: async (res) => {
			await revalidateByTags([URL_ENTITIES.CHAT_MY]);
			connectWebSocket();
			setIsChatCreating(false);
			router.push(`${PAGES.PROFILE_CHAT}/${res.data.id}`);
		},
	});

	const onCreateChat = async () => {
		if (!user) {
			router.push(PAGES.LOGIN);
			return;
		}
		setIsChatCreating(true);
		await action({ establishment_id: item.id });
	};

	return (
		<div className="mt-[50px] lg:mt-6">
			<BreadCrumbs
				home={viewModel.hero.home}
				pageName={getTranslateByKey(locale, item.translates, 'name')}
			/>

			<div className="grid grid-cols-2 lg:grid-cols-1 items-start justify-between gap-7 mt-5">
				<div className="order-2 lg:order-1 flex flex-col gap-6 relative">
					<Button
						className="shadow-none fixed right-5 z-20 bottom-5 rounded-full size-12 lg:size-10"
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

					<p className="text-lg font-medium numeric lg:text-base">
						<span className="mr-[10px] text-lg font-semibold">
							{categoriesViewModel[item.category]}
						</span>
						{item.address}
					</p>

					<div className="flex flex-col gap-4 p-5 lg:p-3 shadow-[0_0_15px_2px_rgba(41,53,61,0.20)] rounded-[15px] bg-background_1 text-sm">
						<p className="flex items-center gap-3 numeric">
							<BsGeoAlt className="w-5 h-5 text-yellow" />
							<span className="font-medium">{viewModel.hero.address}:</span>
							<span className="opacity-70">{item.address}</span>
						</p>
						<p className="flex items-center gap-3 numeric">
							<LiaPhoneSolid className="w-5 h-5 text-yellow" />
							<span className="font-medium">{viewModel.hero.contacts}:</span>
							<span className="opacity-70">
								{item.contacts.phone?.split(';').join('')}
							</span>
						</p>
						<p className="flex items-center gap-3 numeric">
							<GoClock className="w-5 h-5 text-yellow" />
							<span className="font-medium">{viewModel.hero.workTime}:</span>
							<span className="opacity-70">{item.work_time}</span>
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
							{viewModel.hero.aboutEnterprise}
						</h3>
						<p
							className={clsx(
								'text-base lg:text-sm font-normal whitespace-pre-line',
								isLongText && !shouldShowAllText && 'line-clamp-5',
							)}
						>
							{description}
						</p>
						{isLongText && (
							<button
								type="button"
								onClick={() => setShouldShowAllText((prev) => !prev)}
								className="mt-2 text-yellow font-medium hover:underline text-sm"
							>
								{shouldShowAllText
									? viewModel.hero.hide_text
									: viewModel.hero.show_text}
							</button>
						)}
					</div>
				</div>

				<div className="order-1 lg:order-2 flex flex-col items-center gap-4">
					<div className="w-[650px] h-[520px] lg:w-full lg:h-[220px] relative rounded-[20px] overflow-hidden">
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
		</div>
	);
};

export default Hero;
