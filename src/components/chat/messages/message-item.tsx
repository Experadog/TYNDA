import { formatDate } from '@/lib';
import type { Message } from '@business-entities';
import clsx from 'clsx';

type Props = {
	item: Message;
	isMyMessage: boolean;
};

const MessageItem = ({ item, isMyMessage }: Props) => {
	const { content_type, content, created_time } = item;

	if (content_type !== 'text') {
		return null;
	}

	return (
		<div className={`flex mb-2 ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
			<div
				className={clsx(
					'max-w-[70%] min-w-[12%] border border-background_4 px-4 py-1 flex flex-col rounded-xl break-words whitespace-pre-wrap shadow-sm',
					isMyMessage
						? 'bg-chat_my text-foreground_1 rounded-tr-none'
						: 'bg-chat_incoming text-gray-900 rounded-tl-none',
				)}
			>
				<p className="text-foreground_1 text-sm">{content}</p>
				<div className={'text-xs text-gray text-right'}>
					{formatDate(created_time, { showTime: true, timeOnly: true })}
				</div>
			</div>
		</div>
	);
};

export default MessageItem;
