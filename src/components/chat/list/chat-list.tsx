import type { EstablishmentClientRetrievalResponseModel } from '@/services';
import type { ChatListItem, ChatScope } from '@business-entities';
import ChatCreationModal from '../chat-creation/chat-creation-modal';
import ChatItem from './chat-item';

type Props = {
	scope: ChatScope;
	chats: ChatListItem[];
	isCollapsed: boolean;
	establishments?: EstablishmentClientRetrievalResponseModel['data'];
};
const ChatList = ({ scope, chats, establishments }: Props) => {
	const shouldRenderAddition = scope === 'dashboard' || scope === 'profile';

	return (
		<div className={'flex w-full flex-col gap-1'}>
			{shouldRenderAddition && (
				<ChatCreationModal establishments={establishments} scope={scope} />
			)}
			{chats?.map((item) => (
				<ChatItem scope={scope} item={item} key={item.id} />
			))}
		</div>
	);
};

export default ChatList;
