'use server';

import type { ReactNode } from 'react';
import ChatLayoutView from './view/chat-layout-view';

type Props = {
	children: ReactNode;
};

const Layout = async ({ children }: Props) => {
	return <ChatLayoutView>{children}</ChatLayoutView>;
};

export default Layout;
