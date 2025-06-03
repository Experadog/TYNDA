'use client';

import type { ChatPreparingViewType, ChatScope } from '@business-entities';
import clsx from 'clsx';
import { type ReactNode, useState } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { Button } from '../ui/button';
import ChatList from './chat-list';

type Props = {
	children: ReactNode;
	scope: ChatScope;
	chats: ChatPreparingViewType;
	onClick: (chatId: string) => Promise<void>;
};

const ChatCustomLayout = ({ children, scope, chats, onClick }: Props) => {
	const [isCollapsed, setIsCollapsed] = useState(true);

	return (
		<div className="flex h-full font-roboto">
			<div
				className={`flex flex-col gap-0 ${isCollapsed ? 'w-20' : 'w-80'} flex-shrink-0 transition-all relative`}
			>
				<Button
					onClick={() => setIsCollapsed(!isCollapsed)}
					className={clsx(
						'text-foreground_1 bg-background_6 p-5 w-full rounded-r-none shadow-none',
					)}
					size={'icon'}
					disableAnimation
				>
					{isCollapsed ? <MdArrowForwardIos /> : <MdArrowBackIosNew />}
				</Button>

				<div className="relative h-full overflow-hidden">
					<div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-background_2 to-transparent pointer-events-none z-10" />
					<div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-background_2 to-transparent pointer-events-none z-10" />

					<div className="flex flex-col overflow-y-auto h-full py-3 pr-2">
						<ChatList
							scope={scope}
							chats={chats}
							onClick={onClick}
							isCollapsed={isCollapsed}
						/>
					</div>
				</div>
			</div>

			<div className="bg-background_6 rounded-lg  rounded-tl-none  transition-all flex-grow overflow-y-scroll">
				{children}
			</div>
		</div>
	);
};

export default ChatCustomLayout;
