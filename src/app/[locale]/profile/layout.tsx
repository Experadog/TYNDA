import { getClientHistory } from '@/services/profile/profileService';
import { FC, ReactNode } from 'react';
import { ProfileContextProvider } from './use-case/profile-use-case';
import ProfileView from './view/profile-view';

interface IProps {
    children: ReactNode;
}

const ProfileLayout: FC<IProps> = async ({ children }) => {
    const clientHistory = await getClientHistory({ page: '1' });

    return (
        <ProfileContextProvider clientHistoryResponse={clientHistory}>
            <ProfileView>{children}</ProfileView>
        </ProfileContextProvider>
    );
};

export default ProfileLayout;
