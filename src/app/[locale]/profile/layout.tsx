import { DTOEmptyCommonPagination } from '@/dto/dtoEmpty';
import { getClientHistory } from '@/services/profile/profileService';
import type { ClientHistory } from '@business-entities';
import { getSession } from '@common';
import type { FC, ReactNode } from 'react';
import { UpdateProfileProvider } from './update-profile/use-case/useUpdateProfileUseCase';
import { ProfileContextProvider } from './use-case/profile-use-case';
import ProfileView from './view/profile-view';

interface IProps {
	children: ReactNode;
}

const ProfileLayout: FC<IProps> = async ({ children }) => {
	const session = await getSession();

	let clientHistory = DTOEmptyCommonPagination<ClientHistory>();

	if (session?.user?.card) {
		clientHistory = await getClientHistory({ page: '1' });
	}

	return (
		<UpdateProfileProvider>
			<ProfileContextProvider clientHistoryResponse={clientHistory?.data}>
				<ProfileView>{children}</ProfileView>
			</ProfileContextProvider>
		</UpdateProfileProvider>
	);
};

export default ProfileLayout;
