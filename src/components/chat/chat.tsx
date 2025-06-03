'use client';

import { URL_ENTITIES } from '@/lib';
import { useChatWebSocket } from '@/providers/chat-webscoket/chat-webscoket-provider';
import type { ChatScope, ChatType } from '@business-entities';
import { revalidateByTags } from '@common';
import { useEffect, useMemo, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import Avatar from '../avatar/avatar';
import EstablishmentCategoryComponent from '../establishment-category/establishment-category';
import { Button } from '../ui/button';
import CustomInput from '../ui/customInput';
import MessageList from './message-list';

type Props = {
	chat: ChatType;
	scope: ChatScope;
};

const Chat = ({ chat, scope }: Props) => {
	const { messages, sendMessage } = useChatWebSocket();
	const [content, setContent] = useState('');

	const webscoketMessages = useMemo(
		() => messages.filter((m) => m.chat_id === chat.id),
		[chat.id, messages],
	);

	const { avatar, name } = useMemo(() => {
		const avatar = scope === 'establishment' ? chat.client?.avatar : chat.establishment.cover;
		const name =
			scope === 'establishment'
				? chat.client.first_name
				: chat.establishment.translates.ru.name;

		return { avatar, name };
	}, [chat.id, scope]);

	const onSend = () => {
		sendMessage({
			message: {
				content,
				chat_id: chat.id,
				content_type: 'text',
			},
		});
		setContent('');
	};

	useEffect(() => {
		revalidateByTags([URL_ENTITIES.CHAT_DETAILED]);
	}, [chat.id]);

	return (
		<div className="flex flex-col h-full">
			<div className="flex w-full items-start gap-2 p-3 border-b border-b-light_gray">
				<Avatar size="medium" src={avatar} className="border-light_gray" />
				<div className="flex flex-col">
					<p className="text-foreground_1">{name}</p>
					<p className="text-gray text-xs">
						{scope === 'establishment' ? (
							chat.client.phone
						) : (
							<EstablishmentCategoryComponent
								category={chat.establishment.category}
							/>
						)}
					</p>
				</div>
			</div>

			<div className="bg-background_1 h-full overflow-y-scroll relative px-5 py-3">
				<MessageList messages={[...webscoketMessages, ...chat.messages]} />
			</div>

			<div className="bg-background_1 w-full flex items-center gap-3 p-3">
				<CustomInput
					placeholder="Введите сообщение..."
					className="w-full  h-12 border-none"
					onChange={(e) => setContent(e.target.value)}
					value={content}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault();
							if (content.trim()) {
								onSend();
							}
						}
					}}
				/>
				<Button
					className="bg-yellow shadow-none w-auto h-12 rounded-full flex items-center justify-center"
					disableAnimation
					onClick={onSend}
					disabled={!content}
				>
					<IoSend className="text-white" />
				</Button>
			</div>
		</div>
	);
};

export default Chat;
