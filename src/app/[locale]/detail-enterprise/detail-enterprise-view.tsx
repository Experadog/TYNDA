'use client';

import { useViewModel } from '@/i18n/getTranslate';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import Hero from './_components/hero';

const AllPhoto = dynamic(() => import('./_components/all-photo'), { ssr: true });
const WeAdvise = dynamic(() => import('./_components/we-advise'), { ssr: true });

interface IProps {}

const DetailEnterpriseView: FC<IProps> = ({}) => {
    const viewModel = useViewModel(['DetailEnterprise']);
    return (
        <div className='max-w-[1340px] m-auto px-14 lg:px-5'>
            <Hero viewModel={viewModel.hero} />
            <AllPhoto viewModel={viewModel.allPhoto} />
            <WeAdvise viewModel={viewModel.weAdvise} />
        </div>
    );
};

export default DetailEnterpriseView;
