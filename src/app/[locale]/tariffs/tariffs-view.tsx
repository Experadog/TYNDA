'use client';
import { useViewModel } from '@/i18n/getTranslate';
import dynamic from 'next/dynamic';
import Hero from './_components/hero';

const MoreAboutPlans = dynamic(() => import('./_components/more-about-plans'), {
	ssr: true,
});

const TouristicPlan = dynamic(() => import('./_components/touristic-plan'), {
	ssr: true,
});
const TouristClub = dynamic(() => import('./_components/tourist-club'), {
	ssr: true,
});
const FirstService = dynamic(() => import('./_components/first-service'), {
	ssr: true,
});

const BusinessPlan = dynamic(() => import('./_components/business-plan'), {
	ssr: true,
});

const TariffsView = () => {
	const viewModel = useViewModel(['Tariffs']);

	return (
		<>
			<Hero heroViewModel={viewModel.hero} />
			<MoreAboutPlans moreAboutPlansViewModel={viewModel.moreAboutPlans} />
			<div className="max-w-[1340px] m-auto lg:w-full">
				<TouristicPlan touristicPlanViewModel={viewModel.touristicPlan} />
				<BusinessPlan businessPlanViewModel={viewModel.businessPlan} />
			</div>
			<TouristClub touristClubViewModel={viewModel.touristClub} />
			<FirstService firstService={viewModel.firstService} />
		</>
	);
};

export default TariffsView;
