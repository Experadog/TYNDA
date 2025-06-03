import type { ChatPreparingViewType, ChatScope } from '@business-entities';
import ChatListItem from './chat-list-item';
import EstablishmentChatItem from './establishment-chat';

type Props = {
	scope: ChatScope;
	onClick?: (chatId: string) => Promise<void>;
	chats: ChatPreparingViewType;
	isCollapsed: boolean;
};
const ChatList = ({ scope, chats, onClick, isCollapsed }: Props) => {
	return (
		<div className={'flex w-full flex-col gap-1'}>
			{chats.existing_chats?.map((item) => (
				<ChatListItem scope={scope} item={item} key={item.id} />
			))}
			<br />
			<br />
			<br />
			{chats.new_chats?.map((item) => (
				<EstablishmentChatItem
					item={item}
					key={item.id}
					onClick={onClick}
					isCollapsed={isCollapsed}
				/>
			))}
		</div>
	);
};

export default ChatList;
