import type { FC, ReactNode } from 'react';
import AuthView from './auth-view';

interface IProps {
	children: ReactNode;
}

const AuthLayout: FC<IProps> = ({ children }) => {
	return <AuthView>{children}</AuthView>;
};

export default AuthLayout;
