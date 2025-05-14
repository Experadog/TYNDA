import { getClientHistory } from '@/services/profile/profileService';
import type { FC, ReactNode } from 'react';
import { UpdateProfileProvider } from './update-profile/use-case/useUpdateProfileUseCase';
import { ProfileContextProvider } from './use-case/profile-use-case';
import ProfileView from './view/profile-view';

interface IProps {
	children: ReactNode;
}

const ProfileLayout: FC<IProps> = async ({ children }) => {
	const clientHistory = await getClientHistory({ page: '1' });

	return (
		<UpdateProfileProvider>
			<ProfileContextProvider clientHistoryResponse={clientHistory}>
				<ProfileView>{children}</ProfileView>
			</ProfileContextProvider>
		</UpdateProfileProvider>
	);
};

export default ProfileLayout;
