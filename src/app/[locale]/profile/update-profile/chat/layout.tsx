import { PAGINATION } from '@/lib';
import { getEstablishmentAllClient, getUserChatList } from '@/services';
import type { FC, ReactNode } from 'react';
import ChatLayoutView from './view/chat-layout-view';

interface IProps {
	children: ReactNode;
}

const Layout: FC<IProps> = async ({ children }) => {
	const chatResponse = await getUserChatList(PAGINATION.chat);
	const establishmentResponse = await getEstablishmentAllClient(PAGINATION.establishment);

	return (
		<ChatLayoutView chats={chatResponse.data} establishments={establishmentResponse.data}>
			{children}
		</ChatLayoutView>
	);
};

export default Layout;
