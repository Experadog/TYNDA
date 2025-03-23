'use client';
import { Button, Translate } from '@components';
import { FC, useState } from 'react';
import Bonus from './bonus/bonus';
import Rating from './rating/rating';

interface IProps {}

const BonusAndRating: FC<IProps> = ({}) => {
    const [activeTab, setActiveTab] = useState<'bonus' | 'rating'>('bonus');

    const clickBonus = () => setActiveTab('bonus');
    const clickRating = () => setActiveTab('rating');

    const isActiveBonus = activeTab === 'bonus';
    const isActiveRating = activeTab === 'rating';

    return (
        <div className='flex flex-col gap-7'>
            <Translate direction='up'>
                <div className='flex items-center gap-6'>
                    <Button
                        onClick={clickBonus}
                        variant={isActiveBonus ? 'yellow' : 'ghost'}
                        className='rounded-3xl text-sm border-2 border-transparent hover:border-background_2'
                    >
                        История бонусов
                    </Button>

                    <Button
                        onClick={clickRating}
                        variant={isActiveRating ? 'yellow' : 'ghost'}
                        className='rounded-3xl text-sm border-2 border-transparent hover:border-background_2'
                    >
                        Отзывы и рейтинги
                    </Button>
                </div>
            </Translate>
            {activeTab === 'bonus' && <Bonus />}
            {activeTab === 'rating' && <Rating />}
        </div>
    );
};

export default BonusAndRating;
