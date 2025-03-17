'use client';
import { FC } from 'react';
import Hero from './_components/hero';
import Recomendation from './_components/recomendation';
import AdMobile from './_components/adMobile';
import MoreRecs from './_components/moreRecs';
import About from './_components/about';
import { useViewModel } from '@/i18n/getTranslate';

interface IProps {}

const HomeView: FC<IProps> = ({}) => {
    const viewModel = useViewModel(['Home']);
    return (
        <div className='p-3'>
            <Hero viewModel={viewModel.hero} />
            <div className='container max-w-[1340px] m-auto'>
                <Recomendation viewModel={viewModel.recomendation} />
                <AdMobile viewModel={viewModel.adMobile} />
                <MoreRecs viewModel={viewModel.moreRecs} />
                <About viewModel={viewModel.about} />
            </div>
        </div>
    );
};

export default HomeView;
