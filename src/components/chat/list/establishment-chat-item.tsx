'use client';

import type { EstablishmentListItem } from '@business-entities';
import clsx from 'clsx';
import Avatar from '../../avatar/avatar';
import { Button } from '../../ui/button';

type Props = {
	item: EstablishmentListItem;
	onClick: (chatId: string) => Promise<void>;
};

const EstablishmentChatItem = ({ item, onClick }: Props) => {
	return (
		<Button
			disableAnimation
			className={clsx(
				'hover:bg-light_gray flex  bg-transparent  w-full items-center gap-3 rounded-lg p-2 transition-all group shadow-none h-max',
			)}
			onClick={() => onClick(item.id)}
		>
			<Avatar
				src={item.cover || '/other/avatar-placeholder.webp'}
				className="rounded-full size-12 border border-light_gray shrink-0"
			/>

			<div className="flex flex-col justify-center flex-1 overflow-hidden w-max">
				<div className="flex items-center justify-between gap-2">
					<p className="text-base text-foreground_1 truncate w-max">
						{item.translates.ru.name}
					</p>
				</div>
			</div>
		</Button>
	);
};

export default EstablishmentChatItem;
