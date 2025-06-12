import { MOCK_USER_REVIEWS } from '@/dto/dtoUserReviews';
import { Slider } from '@components';
import { useMediaQuery } from 'react-responsive';
import Empty from '../empty';
import RatingCard from './rating-card';

const Rating = () => {
	const isEmpty = false;

	const isMobile = useMediaQuery({ maxWidth: 640 });

	return isEmpty ? (
		<Empty text="Здесь будет ваша история отзывов и рейтингов" />
	) : (
		<Slider
			loop={false}
			slidesPerView={isMobile ? 1 : 2.3}
			spacing={10}
			classNameChildren="p-3"
		>
			{MOCK_USER_REVIEWS.map((item) => (
				<RatingCard key={item.title} {...item} />
			))}
		</Slider>
	);
};

export default Rating;
