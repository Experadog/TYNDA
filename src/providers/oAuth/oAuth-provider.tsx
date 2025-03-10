import { GOOGLE_CLIENT_ID } from '@/lib';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { FC, ReactNode } from 'react';

interface IProps {
    children: ReactNode;
}

const OAuthProvider: FC<IProps> = ({ children }) => {
    return <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>{children}</GoogleOAuthProvider>;
};

export default OAuthProvider;
