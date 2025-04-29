'use client';
import { useViewModel } from '@/i18n/getTranslate';
import { Establishment } from '@/services/establishment/establishmentServiceTypes.ts';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import Hero from './_components/hero';

const EnterprisesFilter = dynamic(() => import('./_components/enterprises-filter'), { ssr: true });

interface IProps {
    establishments: Establishment[];
}

const AllEnterprisesView: FC<IProps> = ({ establishments}) => {
    const viewModel = useViewModel(['AllEnterprises']);
    return (
        <>
            <Hero viewModel={viewModel.hero} />
            <div className='px-14 lg:px-5 max-w-[1340px] m-auto'>
                <EnterprisesFilter viewModel={viewModel.enterprisesFilter} establishments={establishments} />
            </div>
        </>
    );
};

export default AllEnterprisesView;
