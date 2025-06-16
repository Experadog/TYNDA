'use client';

import { Slider, Translate } from '@components';
import { useMediaQuery } from 'react-responsive';
import { useProfileSettingsUseCase } from '../../../use-case/profile-use-case';
import Empty from './empty';
import RecentlyVisitedCard from './recently-visited-card';

const RecentlyVisited = () => {
	const { states, actions } = useProfileSettingsUseCase();
	const { clientHistory } = states;
	const { moveToNextClientHistory } = actions;

	const isEmpty = !clientHistory.items.length;

	const isMobile = useMediaQuery({ maxWidth: 640 });

	return (
		<Translate
			direction="left"
			distance={150}
			className="bg-background_1 rounded-3xl p-6 shadow-md flex flex-col gap-3 w-full overflow-hidden sm:p-0 sm:bg-transparent sm:shadow-none"
		>
			<span className="text-foreground_1 text-base font-semibold sm:text-center">
				Ваши недавно посещенные места
			</span>

			{isEmpty ? (
				<Empty />
			) : (
				<Slider
					loop={false}
					slidesPerView={isMobile ? 1 : 3}
					spacing={1}
					classNameChildren="px-3"
					total={clientHistory.total}
					onReachEnd={moveToNextClientHistory}
					page={clientHistory.page}
				>
					{clientHistory.items.map((item) => (
						<RecentlyVisitedCard key={item.establishment_id} {...item} />
					))}
				</Slider>
			)}
		</Translate>
	);
};

export default RecentlyVisited;
