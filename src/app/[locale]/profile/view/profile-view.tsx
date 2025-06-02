'use client';

import type { FC, ReactNode } from 'react';

interface IProps {
	children: ReactNode;
}

const ProfileView: FC<IProps> = ({ children }) => {
	return <div className="h-full">{children}</div>;
};

export default ProfileView;
