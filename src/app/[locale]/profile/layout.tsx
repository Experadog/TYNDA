import { FC, ReactNode } from 'react';
import ProfileView from './view/profile-view';

interface IProps {
    children: ReactNode;
}

const ProfileLayout: FC<IProps> = ({ children }) => {
    return <ProfileView>{children}</ProfileView>;
};

export default ProfileLayout;
