'use client';

import type { EstablishmentListItem } from '@/business-entities/establishment/EstablishmentEntity';
import dynamic from 'next/dynamic'; // Импорт динамической загрузки
import type { FC } from 'react';
import Hero from './_components/hero';
import { useHomeUseCase } from './use-cases/useHomeUseCase';

const About = dynamic(() => import('./_components/about'), { ssr: true });
const AdMobile = dynamic(() => import('./_components/adMobile'), { ssr: true });
const MoreRecs = dynamic(() => import('./_components/moreRecs'), { ssr: true });
const Recommendation = dynamic(() => import('./_components/recommendation'), {
	ssr: true,
});

interface IProps {
	establishments: EstablishmentListItem[];
}

const HomeView: FC<IProps> = ({ establishments }) => {
	const {
		viewModel: { home, shared },
	} = useHomeUseCase();

	if (!home || !shared) return null;

	return (
		<>
			<Hero heroViewModel={home.hero} />
			<div className="lg:px-5 mx-auto px-6">
				<Recommendation
					recommendationViewModel={home.recommendation}
					sharedViewModel={shared}
					establishments={establishments}
				/>

				<AdMobile adMobileViewModel={home.adMobile} />
				<MoreRecs moreRecsViewModel={home.moreRecs} establishments={establishments} />
				<About aboutViewModel={home.about} />
			</div>
		</>
	);
};

export default HomeView;
