"use client";
import dynamic from "next/dynamic";
import { FC } from "react";
import Hero from "./_components/hero";
import { useTariffsUseCase } from "./use-cases/useTariffsUseCase";

const MoreAboutPlans = dynamic(() => import("./_components/more-about-plans"), {
  ssr: true,
});

const TouristicPlan = dynamic(() => import("./_components/touristic-plan"), {
  ssr: true,
});
const TouristClub = dynamic(() => import("./_components/tourist-club"), {
  ssr: true,
});
const FirstService = dynamic(() => import("./_components/first-service"), {
  ssr: true,
});

const BusinessPlan = dynamic(() => import("./_components/business-plan"), {
  ssr: true,
});

interface IProps { }

const TariffsView: FC<IProps> = ({ }) => {
  const {
    viewModel: { tariffs }
  } = useTariffsUseCase();
  return (
    <>
      <Hero heroViewModel={tariffs.hero} />
      <MoreAboutPlans moreAboutPlansViewModel={tariffs.moreAboutPlans} />
      <div className="max-w-[1340px] m-auto lg:w-full">
        <TouristicPlan touristicPlanViewModel={tariffs.touristicPlan} />
        <BusinessPlan businessPlanViewModel={tariffs.businessPlan} />
      </div>
      <TouristClub touristClubViewModel={tariffs.touristClub} />
      <FirstService firstService={tariffs.firstService} />
    </>
  );
};

export default TariffsView;
