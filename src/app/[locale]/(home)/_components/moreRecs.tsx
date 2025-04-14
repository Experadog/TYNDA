'use client';
import { Translate } from '@components';
import { FC } from 'react';
import { useHomeUseCase } from '../use-cases/useHomeUseCase';
import RecommendationCard from './recommendationCard';

interface IProps {
    viewModel: ViewModel['Home']['moreRecs'];
}

const MoreRecs: FC<IProps> = ({}) => {
    const { viewModel } = useHomeUseCase();
    return (
        <Translate
            direction='right'
            distance={100}
            animateOnce={false}
        >
            <div className='mt-[120px] lg:mt-[60px] flex flex-col items-center justify-center gap-[20px] '>
                <h3 className='text-lg lg:text-base font-semibold uppercase'>{viewModel.moreRecs.title}</h3>
                <h2 className='text-[34px] lg:text-2xl font-medium'>{viewModel.moreRecs.description}</h2>
                <div className='mt-[40px] lg:mt-[10px] grid grid-cols-2 lg:grid-cols-1 justify-between gap-[25px] lg:gap-[30px]'>
                    <Translate
                        direction='right'
                        distance={100}
                        animateOnce={false}
                    >
                        <div>
                            <RecommendationCard
                                ratingClassName='md:pr-4 exs:pr-0'
                                imageClassName='h-[560px] lg:h-[322px]'
                                bottomElClassName='flex flex-col gap-[20px] lg:gap-[10px]'
                            />
                        </div>
                    </Translate>
                    <Translate
                        direction='left'
                        distance={100}
                        animateOnce={false}
                    >
                        <div className='grid grid-cols-2 gap-[25px] lg:gap-[10px]'>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <RecommendationCard
                                    ratingClassName='md:pr-4 exs:pr-0 xs:justify-start xs:gap-2'
                                    key={index}
                                    imageClassName='w-[320px] h-[224px] lg:w-full xs:h-[171px] md:h-[250px]'
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
