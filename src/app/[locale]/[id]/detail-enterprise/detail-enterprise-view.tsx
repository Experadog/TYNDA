'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { Establishment, EstablishmentDetail } from '@/services/establishment/establishmentServiceTypes.ts';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import Hero from './_components/hero';

const AllPhoto = dynamic(() => import('./_components/all-photo'), { ssr: true });
const WeAdvise = dynamic(() => import('./_components/we-advise'), { ssr: true });

interface IProps {
    establishment: EstablishmentDetail;
    allEstablishments: Establishment[];
}

const DetailEnterpriseView: FC<IProps> = ({ establishment, allEstablishments }) => {
    const viewModel = useViewModel(['DetailEnterprise']);
    return (
        <div className='max-w-[1340px] m-auto px-14 lg:px-5'>
            <Hero viewModel={viewModel} establishment={establishment} />
            <AllPhoto viewModel={viewModel.allPhoto} establishment={establishment} />
            <WeAdvise viewModel={viewModel.weAdvise} allEstablishments={allEstablishments} />
        </div>
    );
};

export default DetailEnterpriseView;
