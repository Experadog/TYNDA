'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { Establishment } from '@/services/establishment/establishmentServiceTypes.ts';
import dynamic from 'next/dynamic'; // Импорт динамической загрузки
import { FC } from 'react';
import Hero from './_components/hero';

const About = dynamic(() => import('./_components/about'), { ssr: true });
const AdMobile = dynamic(() => import('./_components/adMobile'), { ssr: true });
const MoreRecs = dynamic(() => import('./_components/moreRecs'), { ssr: true });
const Recommendation = dynamic(() => import('./_components/recommendation'), {
    ssr: true,
});

interface IProps {
    establishments: Establishment[];
}

const HomeView: FC<IProps> = ({establishments}) => {
    const viewModel = useViewModel(['Home']);
    return (
        <>
            <Hero viewModel={viewModel.hero} />
            <div className='px-[50px] lg:px-5 max-w-[1390px] m-auto'>
                <Recommendation viewModel={viewModel.recommendation} establishments={establishments} />
                <AdMobile viewModel={viewModel.adMobile} />
                <MoreRecs viewModel={viewModel.moreRecs} establishments={establishments} />
                <About viewModel={viewModel.about} />
            </div>
        </>
    );
};

export default HomeView;
