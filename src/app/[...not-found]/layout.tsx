import { FC, ReactNode } from 'react';

interface IProps {
    children: ReactNode;
}

const NotFoundPageLayout: FC<IProps> = ({ children }) => {
    return <>{children}</>;
};

export default NotFoundPageLayout;
