import { Translate } from '@components';
import BonusAndRating from '../_components/bonus-and-rating/bonus-and-rating';
import Hero from '../_components/hero/hero';
import RecentlyVisited from '../_components/recently-visited/recently-visited';
import UserCard from '../_components/user-card/user-card';

const MainProfileView = () => {
	return (
		<div className="flex flex-col gap-12 pb-32 py-7 px-12 sm:px-3 sm:py-4">
			<Translate direction="down" distance={150} animateOnce={true}>
				<Hero />
			</Translate>

			<div className="flex gap-7 pl-10 relative sm:p-0 sm:flex-col">
				<UserCard />
				<RecentlyVisited />
			</div>
			<div className="pl-10 sm:p-0">
				<BonusAndRating />
			</div>
		</div>
	);
};

export default MainProfileView;
