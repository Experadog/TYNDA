import { FC, ReactNode } from 'react';
import { ProfileContextProvider } from './use-case/profile-use-case';
import ProfileView from './view/profile-view';

interface IProps {
    children: ReactNode;
}

const ProfileLayout: FC<IProps> = async ({ children }) => {
    return (
        <ProfileContextProvider>
            <ProfileView>{children}</ProfileView>
        </ProfileContextProvider>
    );
};

export default ProfileLayout;
