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
            <div className='flex gap-7 relative'>
                <div className='w-full max-w-[416px] ml-10'>
                    <Translate
                        direction='up'
                        distance={150}
                    >
                        <UserCard />
                    </Translate>
                </div>

                <Translate
                    direction='left'
                    distance={150}
                    className={'w-full'}
                >
                    <RecentlyVisited />
                </Translate>
            </div>
        </div>
    );
};

export default MainProfileView;
