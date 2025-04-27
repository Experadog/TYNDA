import { FC, ReactNode } from 'react';
import ChatLayoutView from './view/chat-layout-view';

interface IProps {
    children: ReactNode;
}

const ChatLayout: FC<IProps> = ({ children }) => {
    return <ChatLayoutView>{children}</ChatLayoutView>;
};

export default ChatLayout;
