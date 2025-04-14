'use client';
import { FC } from 'react';
import Hero from './_components/hero';
import dynamic from 'next/dynamic';
import { useViewModel } from '@/i18n/getTranslate';

const EnterprisesFilter = dynamic(() => import('./_components/enterprises-filter'), { ssr: true });

interface IProps {}

const AllEnterprisesView: FC<IProps> = ({}) => {
    const viewModel = useViewModel(['AllEnterprises']);
    return (
        <>
            <Hero viewModel={viewModel.hero} />
            <div className='px-14 lg:px-5 max-w-[1340px] m-auto'>
                <EnterprisesFilter viewModel={viewModel.enterprisesFilter} />
            </div>
        </>
    );
};

export default AllEnterprisesView;
