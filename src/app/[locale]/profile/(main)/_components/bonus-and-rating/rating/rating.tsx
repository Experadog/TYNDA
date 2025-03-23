import { MOCK_USER_REVIEWS } from '@/dto/dtoUserReviews';
import { Slider } from '@components';
import { FC } from 'react';
import Empty from '../empty';
import RatingCard from './rating-card';

interface IProps {}

const Rating: FC<IProps> = ({}) => {
    const isEmpty = false;

    return isEmpty ? (
        <Empty text='Здесь будет ваша история отзывов и рейтингов' />
    ) : (
        <Slider
            loop={false}
            slidesPerView={2.3}
            spacing={10}
            classNameChildren='p-3'
        >
            {MOCK_USER_REVIEWS.map((item) => (
                <RatingCard
                    key={item.title}
                    {...item}
                />
            ))}
        </Slider>
    );
};

export default Rating;
