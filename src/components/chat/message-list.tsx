import { formatDate } from '@/lib';
import { useUser } from '@/providers/user/user-provider';
import type { Message } from '@business-entities';
import { useEffect, useRef } from 'react';
import MessageItem from './message-item';

type Props = {
	messages: Message[];
	history: Message[];
};

function groupMessagesByDate(messages: Message[]) {
	const groups: { date: string; messages: Message[] }[] = [];

	for (const msg of messages) {
		const date = formatDate(msg.message.created_time);
		const lastGroup = groups[groups.length - 1];

		if (!lastGroup || lastGroup.date !== date) {
			groups.push({ date, messages: [msg] });
		} else {
			lastGroup.messages.push(msg);
		}
	}

	return groups;
}

const MessageList = ({ messages, history }: Props) => {
	const { user } = useUser();

	const scrollRef = useRef<HTMLDivElement | null>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: scroll on new messages
	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const allMessages = [...history, ...messages].sort(
		(a, b) =>
			new Date(a.message.created_time).getTime() - new Date(b.message.created_time).getTime(),
	);

	const grouped = groupMessagesByDate(allMessages);

	return (
		<div className="">
			{grouped.map((group) => (
				<div key={group.date}>
					<div className="flex justify-center my-4 sticky top-1">
						<span className="bg-background_4 text-gray px-3 py-1 rounded-full text-xs select-none">
							{group.date}
						</span>
					</div>

					{group.messages.map((item) => (
						<MessageItem
							key={item.message.id}
							item={item}
							isMyMessage={user?.id === item.message.sender_id}
						/>
					))}
				</div>
			))}
			<div ref={scrollRef} />
		</div>
	);
};

export default MessageList;
