'use client';

import { Slider, Translate } from '@components';
import { FC } from 'react';
import { useProfileUseCase } from '../../../use-case/profile-use-case';
import Empty from './empty';
import RecentlyVisitedCard from './recently-visited-card';

interface IProps {}

const RecentlyVisited: FC<IProps> = ({}) => {
    const { states, actions } = useProfileUseCase();
    const { clientHistory } = states;
    const { moveToNextClientHistory } = actions;

    const isEmpty = clientHistory.data ? !clientHistory.data.items.length : true;

    return (
        <Translate
            direction='left'
            distance={150}
            className='bg-background_1 rounded-3xl p-6 shadow-md flex flex-col gap-3 w-full overflow-hidden'
        >
            <span className='text-foreground_1 text-base font-semibold'>
                Ваши недавно посещенные места
            </span>

            {isEmpty ? (
                <Empty />
            ) : (
                <Slider
                    loop={false}
                    slidesPerView={3}
                    spacing={1}
                    classNameChildren='p-3'
                    total={clientHistory.data.total}
                    onReachEnd={moveToNextClientHistory}
                    page={clientHistory.data.page}
                >
                    {clientHistory.data.items.map((item) => (
                        <RecentlyVisitedCard
                            key={item.establishment_id}
                            {...item}
                        />
                    ))}
                </Slider>
            )}
        </Translate>
    );
};

export default RecentlyVisited;
