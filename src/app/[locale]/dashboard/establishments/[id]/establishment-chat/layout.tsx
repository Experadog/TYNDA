import { getEstablishmentChatList } from '@/services';
import type { ReactNode } from 'react';
import EstChatLayoutView from './view/est-chat-layout-view';

type Params = Promise<{
	id: string;
}>;

type Props = {
	children: ReactNode;
	params: Params;
};

const Layout = async ({ children, params }: Props) => {
	const { id } = await params;
	const response = await getEstablishmentChatList({ establishment_id: id });

	return (
		<EstChatLayoutView chatResponse={response.data} establishment_id={id}>
			{children}
		</EstChatLayoutView>
	);
};

export default Layout;
