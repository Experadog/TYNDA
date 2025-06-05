import { PAGINATION } from '@/lib';
import { getEstablishmentAllClient, getUserChatList } from '@/services';
import type { ReactNode } from 'react';
import ChatLayoutView from './view/chat-layout-view';

type Props = {
	children: ReactNode;
};

const Layout = async ({ children }: Props) => {
	const chatsResponse = await getUserChatList(PAGINATION.chat);
	const establishmentResponse = await getEstablishmentAllClient(PAGINATION.establishment);

	return (
		<ChatLayoutView
			chatsResponse={chatsResponse.data}
			establishmentResponse={establishmentResponse.data}
		>
			{children}
		</ChatLayoutView>
	);
};

export default Layout;
