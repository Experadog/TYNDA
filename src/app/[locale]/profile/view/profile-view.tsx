'use client';

import { FC, ReactNode } from 'react';

interface IProps {
    children: ReactNode;
}

const ProfileView: FC<IProps> = ({ children }) => {
    return <div className='h-full px-12 py-7'>{children}</div>;
};

export default ProfileView;
