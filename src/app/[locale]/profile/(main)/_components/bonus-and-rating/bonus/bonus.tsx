import { MOCK_BONUS_HISTORY } from '@/dto/dtoBonusHistory';
import { Slider } from '@components';
import { FC } from 'react';
import Empty from '../empty';
import BonusCard from './bonus-card';

interface IProps {}

const Bonus: FC<IProps> = ({}) => {
    const isEmpty = false;

    return isEmpty ? (
        <Empty text='Здесь будет ваша история использованных бонусов и скидок!' />
    ) : (
        <Slider
            loop={false}
            slidesPerView={4.5}
            spacing={15}
            classNameChildren='p-3'
        >
            {MOCK_BONUS_HISTORY.map((item) => (
                <BonusCard
                    key={item.title}
                    {...item}
                />
            ))}
        </Slider>
    );
};

export default Bonus;
