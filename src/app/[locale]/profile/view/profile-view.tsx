'use client';

import { useRouter } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { useUser } from '@/providers/user/user-provider';
import { logout } from '@/services';
import { Button } from '@components';
import { FC } from 'react';

interface IProps {}

const ProfileView: FC<IProps> = () => {
    const router = useRouter();
    const { user, setUser } = useUser();

    const handleLogout = async () => {
        const response = await logout();
        if (response.code === 200) {
            router.push(PAGES.LOGIN);
            setUser(null);
        }
    };

    return (
        <div className='h-[1000px] pt-16'>
            {JSON.stringify(user)},<Button onClick={handleLogout}>Logout</Button>
        </div>
    );
};

export default ProfileView;
