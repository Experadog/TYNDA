import { divideChatToNewAndExisting } from '@/lib';
import { getChatList, getEstablishmentAllClient } from '@/services';
import type { FC, ReactNode } from 'react';
import ChatLayoutView from './view/chat-layout-view';

interface IProps {
	children: ReactNode;
}

const Layout: FC<IProps> = async ({ children }) => {
	const establishments = await getEstablishmentAllClient({});
	const response = await getChatList();

	const chats = divideChatToNewAndExisting(establishments.data.items, response.data.items);

	return <ChatLayoutView chats={chats}>{children}</ChatLayoutView>;
};

export default Layout;
