'use client';

import { useUser } from '@/providers/user/user-provider';
import { FC, ReactNode } from 'react';
import { UpdateProfileProvider } from '../profile/update-profile/use-case/useUpdateProfileUseCase';
import Sidebar from './_components/sidebar';

interface IProps {
    children: ReactNode;
}

const DashboardLayout: FC<IProps> = ({ children }) => {
    const { user } = useUser();

    return (
        <UpdateProfileProvider user={user}>
            <div className='flex full-height'>
                <div className='flex-[1] p-6 border-r border-r-light_gray'>
                    <Sidebar user={user!} />
                </div>
                <div className='flex-[5] p-6 bg-background_2'>{children}</div>
            </div>
        </UpdateProfileProvider>
    );
};

export default DashboardLayout;
