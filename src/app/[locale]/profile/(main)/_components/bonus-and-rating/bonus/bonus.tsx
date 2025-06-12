import { MOCK_BONUS_HISTORY } from '@/dto/dtoBonusHistory';
import { Slider } from '@components';
import { useMediaQuery } from 'react-responsive';
import Empty from '../empty';
import BonusCard from './bonus-card';

const Bonus = () => {
	const isEmpty = false;

	const isMobile = useMediaQuery({ maxWidth: 640 });

	return isEmpty ? (
		<Empty text="Здесь будет ваша история использованных бонусов и скидок!" />
	) : (
		<Slider
			loop={false}
			slidesPerView={isMobile ? 1 : 4.5}
			spacing={15}
			classNameChildren="p-3"
		>
			{MOCK_BONUS_HISTORY.map((item) => (
				<BonusCard key={item.title} {...item} />
			))}
		</Slider>
	);
};

export default Bonus;
