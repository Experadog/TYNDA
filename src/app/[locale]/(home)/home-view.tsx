'use client';
import { useViewModel } from '@/i18n/getTranslate';
import { FC } from 'react';
import About from './_components/about';
import AdMobile from './_components/adMobile';
import Hero from './_components/hero';
import MoreRecs from './_components/moreRecs';
import Recommendation from './_components/recommendation';

interface IProps {}

const HomeView: FC<IProps> = ({}) => {
    const viewModel = useViewModel(['Home']);
    return (
        <div className='p-3'>
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
