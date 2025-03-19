'use client';

import { Slider, Translate } from '@components';
import { FC } from 'react';
import RecentlyVisitedCard from './recently-visited-card';

import { MOCK_CLIENT_HISTORY } from '@/dto/dtoClientHistory';

interface IProps {}

const RecentlyVisited: FC<IProps> = ({}) => {
    return (
        <Translate
            direction='left'
            distance={150}
            className='bg-background_1 rounded-3xl p-6 shadow-md flex flex-col gap-3 w-full overflow-hidden'
        >
            <span className='text-foreground_1 text-base font-semibold'>Ваши недавно посещенные места</span>

            <Slider
                loop={false}
                slidesPerView={3}
                spacing={1}
                classNameChildren='px-3'
            >
                {MOCK_CLIENT_HISTORY.map((item) => (
                    <RecentlyVisitedCard
                        key={item.title}
                        {...item}
                    />
                ))}
            </Slider>
        </Translate>
    );
};

export default RecentlyVisited;
