'use client';

import type { FC, ReactNode } from 'react';
import UpdateProfileView from './view/update-profile-view';

interface IProps {
	children: ReactNode;
}

const UpdateProfileLayout: FC<IProps> = ({ children }) => {
	return <UpdateProfileView>{children}</UpdateProfileView>;
};

export default UpdateProfileLayout;
