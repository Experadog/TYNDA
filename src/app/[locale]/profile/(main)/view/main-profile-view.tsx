import { Translate } from '@components';
import BonusAndRating from '../_components/bonus-and-rating/bonus-and-rating';
import Hero from '../_components/hero/hero';
import RecentlyVisited from '../_components/recently-visited/recently-visited';
import UserCard from '../_components/user-card/user-card';

const MainProfileView = () => {
	return (
		<div className="flex flex-col gap-12 pb-32 py-7 px-12">
			<Translate direction="down" distance={150}>
				<Hero />
			</Translate>

			<div className="flex gap-7 pl-10 relative">
				<UserCard />
				<RecentlyVisited />
			</div>
			<div className="pl-10">
				<BonusAndRating />
			</div>
		</div>
	);
};

export default MainProfileView;
