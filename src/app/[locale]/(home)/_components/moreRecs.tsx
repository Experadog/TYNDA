'use client';
import { Translate } from '@components';
import { FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useHomeUseCase } from '../use-cases/useHomeUseCase';
import RecommendationCard from './recommendationCard';

interface IProps {
    viewModel: ViewModel['Home']['moreRecs'];
}

const MoreRecs: FC<IProps> = ({}) => {
    const { viewModel } = useHomeUseCase();
    const isLargeScreen = useMediaQuery({ minWidth: 1025 });
    const itemsCount = isLargeScreen ? 4 : 2;
    return (
        <Translate
            direction='right'
            distance={100}
            animateOnce={false}
        >
            <div className='mt-[120px] lg:mt-[60px] flex flex-col items-center justify-center gap-[20px] '>
                <h3 className='text-lg font-semibold uppercase'>{viewModel.moreRecs.title}</h3>
                <h2 className='text-[34px] font-medium'>{viewModel.moreRecs.description}</h2>
                <div className='mt-[40px] grid grid-cols-2 lg:grid-cols-1 justify-between gap-[25px] lg:gap-[30px] lg:px-5'>
                    <Translate
                        direction='right'
                        distance={100}
                        animateOnce={false}
                    >
                        <div>
                            <RecommendationCard
                                ratingClassName='max-w-[170px]'
                                imageClassName='h-[560px]'
                                className=''
                                bottomElClassName='flex flex-col gap-[20px]'
                            />
                        </div>
                    </Translate>
                    <Translate
                        direction='left'
                        distance={100}
                        animateOnce={false}
                    >
                        <div className='grid grid-cols-2 gap-[25px] lg:gap-[10px]'>
                            {Array.from({ length: itemsCount }).map((_, index) => (
                                <RecommendationCard
                                    ratingClassName='max-w-[170px]'
                                    key={index}
                                    imageClassName='w-[320px] h-[224px]'
                                    hideDescription
                                />
                            ))}
                        </div>
                    </Translate>
                </div>
            </div>
        </Translate>
    );
};

export default MoreRecs;
