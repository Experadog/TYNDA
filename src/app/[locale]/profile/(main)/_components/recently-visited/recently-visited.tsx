'use client';

import { Button } from '@components';
import { FC } from 'react';
import { useProfileUseCase } from '../../use-case/useProfileUseCase';

interface IProps {}

const RecentlyVisited: FC<IProps> = ({}) => {
    const { handleLogout } = useProfileUseCase();
    return (
        <div className='bg-background_1 w-full rounded-3xl p-6 shadow-md h-full'>
            <Button onClick={handleLogout}>logout</Button>
        </div>
    );
};

export default RecentlyVisited;
