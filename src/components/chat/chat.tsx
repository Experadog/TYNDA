'use client';

import { useChatWebSocket } from '@/providers/chat-webscoket/chat-webscoket-provider';
import type { ChatType } from '@business-entities';
import { useMemo, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import Avatar from '../avatar/avatar';
import EstablishmentCategoryComponent from '../establishment-category/establishment-category';
import { Button } from '../ui/button';
import CustomInput from '../ui/customInput';
import MessageList from './message-list';

type Props = {
	chat: ChatType;
};

const Chat = ({ chat }: Props) => {
	const { messages, sendMessage } = useChatWebSocket();
	const [content, setContent] = useState('');

	const chatMessages = useMemo(
		() => messages.filter((m) => m.message.chat_id === chat.id),
		[chat.id, messages],
	);

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

	return (
		<div className="flex flex-col h-full">
			<div className="flex w-full items-start gap-2 p-3 border-b border-b-light_gray">
				<Avatar
					size="medium"
					src={chat.establishment.cover}
					className="border-light_gray"
				/>
				<div className="flex flex-col">
					<p className="text-foreground_1">{chat.establishment.translates.ru.name}</p>
					<p className="text-gray text-xs">
						<EstablishmentCategoryComponent category={chat.establishment.category} />
					</p>
				</div>
			</div>

			<div className="bg-background_1 h-full overflow-y-scroll relative px-5 py-3">
				<MessageList messages={chatMessages} history={chat.messages} />
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
