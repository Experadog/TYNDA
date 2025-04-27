"use client";
import dynamic from "next/dynamic";
import { FC } from "react";
import Hero from "./_components/hero";

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

interface IProps {}

const TariffsView: FC<IProps> = ({}) => {
  return (
    <>
      <Hero />
      <MoreAboutPlans />
      <div className="max-w-[1340px] m-auto lg:w-full">
        <TouristicPlan />
      </div>
      <TouristClub />
      <FirstService />
    </>
  );
};

export default TariffsView;
