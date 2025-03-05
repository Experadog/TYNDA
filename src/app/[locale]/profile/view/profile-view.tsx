'use client';

import { Button } from '@components';
import { FC } from 'react';
import { useProfileUseCase } from '../use-case/useProfileUseCase';

interface IProps {}

const ProfileView: FC<IProps> = () => {
    const { handleLogout, user } = useProfileUseCase();

    return (
        <div className='h-[1000px] pt-16'>
            {JSON.stringify(user)},<Button onClick={handleLogout}>Logout</Button>
        </div>
    );
};

export default ProfileView;
