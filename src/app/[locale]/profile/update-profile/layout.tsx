'use client';

import { useUser } from '@/providers/user/user-provider';
import type { FC, ReactNode } from 'react';
import { UpdateProfileProvider } from './use-case/useUpdateProfileUseCase';
import UpdateProfileView from './view/update-profile-view';

interface IProps {
	children: ReactNode;
}

const UpdateProfileLayout: FC<IProps> = ({ children }) => {
	const { user } = useUser();

	return (
		<UpdateProfileProvider user={user}>
			<UpdateProfileView>{children}</UpdateProfileView>
		</UpdateProfileProvider>
	);
};

export default UpdateProfileLayout;
