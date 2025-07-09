import { useViewModel } from '@/i18n/getTranslate';
import { priceFormatter } from '@/lib';
import { useLocale } from '@/providers/locale/locale-provider';
import type { EstablishmentListItem } from '@business-entities';
import { type UsePaginationType, useSetParams } from '@common';
import { InfinityScroll, LoadingSpinner } from '@components';
import clsx from 'clsx';
import Image from 'next/image';

type Props = {
	pagination: UsePaginationType<EstablishmentListItem>;
};

const EstablishmentBlock = ({ pagination }: Props) => {
	const { establishment_categories } = useViewModel(['Shared']);

	const { locale } = useLocale();
	const { setParam, getParam } = useSetParams();
	const id = getParam('id');

	return (
		<InfinityScroll
			isLoading={pagination.states.isLoading}
			hasMore={pagination.states.hasNextPage}
			onLoadMore={pagination.actions.onGoNextPage}
			key={JSON.stringify(pagination.states.keys)}
			className="flex flex-col gap-2 pb-3 flex-1 min-h-0"
			customLoading={
				<div>
					<LoadingSpinner className="text-yellow size-10 mx-auto mt-5" />
				</div>
			}
		>
			{pagination.states.list.map((item) => (
				<div
					className={clsx(
						'flex gap-3 h-[120px] cursor-pointer hover:bg-background_2 rounded-xl pr-2',
						id === item.id && 'bg-background_2 pointer-events-none',
					)}
					key={item.id}
					onClick={() => setParam('id', item.id)}
				>
					<div className="h-[120px] w-[120px] relative flex-shrink-0">
						<Image
							src={item.cover}
							fill
							className="object-cover rounded-xl"
							alt={item.id}
							priority
						/>
					</div>
					<div className="flex flex-col gap-1  font-roboto">
						<p className="line-clamp-1 text-foreground_1 text-xl">
							{item.translates[locale].name}
						</p>

						<p className="text-gray text-xs line-clamp-3">
							{item.translates[locale].description}
						</p>

						<p className="mt-auto mb-3 text-yellow text-xs  flex items-center justify-between">
							<strong className="text-right">
								{establishment_categories[item.category]}
							</strong>

							{priceFormatter(item.average_bill, 'с')}
						</p>
					</div>
				</div>
			))}
		</InfinityScroll>
	);
};

export default EstablishmentBlock;
