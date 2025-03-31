'use client';

import { useViewModel } from '@/i18n/getTranslate';
import dynamic from 'next/dynamic'; // Импорт динамической загрузки
import { FC } from 'react';
import Hero from './_components/hero';

const About = dynamic(() => import('./_components/about'), { ssr: true });
const AdMobile = dynamic(() => import('./_components/adMobile'), { ssr: true });
const MoreRecs = dynamic(() => import('./_components/moreRecs'), { ssr: true });
const Recommendation = dynamic(() => import('./_components/recommendation'), {
    ssr: true,
});

interface IProps {}

const HomeView: FC<IProps> = ({}) => {
    const viewModel = useViewModel(['Home']);
    return (
        <div className='p-3 lg:p-0'>
            <Hero viewModel={viewModel.hero} />
            <div className='container m-auto'>
                <Recommendation viewModel={viewModel.recommendation} />
                <AdMobile viewModel={viewModel.adMobile} />
                <MoreRecs viewModel={viewModel.moreRecs} />
                <About viewModel={viewModel.about} />
            </div>
        </div>
    );
};

export default HomeView;
