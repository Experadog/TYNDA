import { formatDate } from '@/lib';
import type { Message } from '@business-entities';

type Props = {
	item: Message;
	isMyMessage: boolean;
};

const MessageItem = ({ item, isMyMessage }: Props) => {
	const { message } = item;

	if (message.content_type !== 'text') {
		return null;
	}

	return (
		<div className={`flex mb-2 ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
			<div
				className={`
          max-w-[70%] px-4 py-2
          rounded-xl
          break-words
          whitespace-pre-wrap
          ${
				isMyMessage
					? 'bg-green-600 text-white rounded-br-none'
					: 'bg-background_6 text-gray-900 rounded-bl-none'
			}
        `}
			>
				<div>{message.content}</div>
				<div
					className={`text-xs mt-1 ${
						isMyMessage ? 'text-green-100' : 'text-gray-600'
					} text-right`}
				>
					{formatDate(message.created_time, { showTime: true, timeOnly: true })}
				</div>
			</div>
		</div>
	);
};

export default MessageItem;
