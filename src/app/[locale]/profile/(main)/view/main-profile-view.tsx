import { Translate } from '@components';
import { FC } from 'react';
import Hero from '../_components/hero/hero';
import RecentlyVisited from '../_components/recently-visited/recently-visited';
import UserCard from '../_components/user-card/user-card';

interface IProps {}

const MainProfileView: FC<IProps> = ({}) => {
    return (
        <div className='flex flex-col gap-12'>
            <Translate
                direction='down'
                distance={150}
            >
                <Hero />
            </Translate>

            <div className='flex gap-7 pl-10 relative'>
                <UserCard />
                <RecentlyVisited />
            </div>
        </div>
    );
};

export default MainProfileView;
