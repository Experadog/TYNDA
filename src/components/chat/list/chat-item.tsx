'use client';

import { Link } from '@/i18n/routing';
import { PAGES } from '@/lib';
import type { ChatListItem, ChatScope } from '@business-entities';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import Avatar from '../../avatar/avatar';

type Props = {
	scope: ChatScope;
	item: ChatListItem;
};

const ChatItem = ({ scope, item }: Props) => {
	const { id, chat_id } = useParams();

	const isActive = item.id === id || item.id === chat_id;

	const commonPath = useMemo(() => {
		switch (scope) {
			case 'profile':
				return PAGES.PROFILE_CHAT;
			case 'dashboard':
				return PAGES.DASHBOARD_CHAT;
			case 'establishment':
				return `${PAGES.ESTABLISHMENT}/${item.establishment.id}/${PAGES.CHAT}`;
			default:
				return '';
		}
	}, [scope]);

	const { avatar, name } = useMemo(() => {
		const avatar = scope === 'establishment' ? item.client?.avatar : item.establishment.cover;
		const name =
			scope === 'establishment'
				? item.client.first_name || item.client.last_name || item.client.phone
				: item.establishment.translates.ru.name;

		return { avatar, name };
	}, [item.id, scope]);

	return (
		<Link
			href={`${commonPath}/${item.id}`}
			className={clsx(
				'hover:bg-light_gray flex items-center gap-3 rounded-lg p-2 transition-all group w-full',
				isActive && 'bg-light_gray',
			)}
		>
			<Avatar
				src={avatar}
				className="rounded-full size-12 border border-light_gray shrink-0"
			/>
			<div className="flex flex-col justify-center flex-1 overflow-hidden">
				<div className="flex items-center justify-between gap-2">
					<p className="text-base text-foreground_1 truncate w-full">{name}</p>
					<p className="text-foreground_2 text-xs">
						{/* {item?.last_message_time || '11:03'} */}
					</p>
				</div>
				<p className="text-gray text-xs truncate whitespace-nowrap overflow-hidden">
					{/* {item?.last_message || 'Привет'} */}
				</p>
			</div>
		</Link>
	);
};

export default ChatItem;
