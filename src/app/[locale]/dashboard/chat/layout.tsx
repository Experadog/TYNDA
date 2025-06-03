import type { ReactNode } from 'react';
import ChatLayoutView from './view/chat-layout-view';

type Props = {
	children: ReactNode;
};

const Layout = ({ children }: Props) => {
	return <ChatLayoutView>{children}</ChatLayoutView>;
};

export default Layout;
