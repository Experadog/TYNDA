'use client';
import { FC } from 'react';
import Hero from './_components/hero';
import MoreAboutPlans from './_components/more-about-plans';
import TouristicPlan from './_components/touristic-plan';
import TouristClub from './_components/tourist-club';
import FirstService from './_components/first-service';

interface IProps {}

const TariffsView: FC<IProps> = ({}) => {
    return (
        <>
            <Hero />
            <MoreAboutPlans />
            <div className='max-w-[1340px] m-auto lg:w-full'>
                <TouristicPlan />
            </div>
            <TouristClub />
            <FirstService />
        </>
    );
};

export default TariffsView;
