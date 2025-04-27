'use client';
import { Translate } from '@components';
import { FC } from 'react';
import { Establishment } from '../page';
import { useHomeUseCase } from '../use-cases/useHomeUseCase';
import RecommendationCard from './recommendationCard';

interface IProps {
    viewModel: ViewModel['Home']['moreRecs'];
    establishments: Establishment[];
}

const MoreRecs: FC<IProps> = ({ establishments }) => {
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
                            {establishments[0] && (
                                <RecommendationCard
                                    key={establishments[0].id}
                                    ratingClassName='md:pr-4 exs:pr-0'
                                    imageClassName='h-[560px] lg:h-[322px]'
                                    establishmentImageContainer='max-w-[650px] max-h-[560px]'
                                    bottomElClassName='flex flex-col gap-[20px] lg:gap-[10px]'
                                    establishment={establishments[0]}
                                />
                            )}
                        </div>
                    </Translate>
                    <Translate
                        direction='left'
                        distance={100}
                        animateOnce={false}
                    >
                        <div className='grid grid-cols-2 gap-[25px] lg:gap-[10px]'>
                            {establishments.map((establishment) => (
                                <RecommendationCard
                                    ratingClassName='md:pr-4 exs:pr-0 xs:justify-start xs:gap-2'
                                    key={establishment.id}
                                    imageClassName='w-[320px] h-[224px] lg:w-full xs:h-[171px] md:h-[250px]'
                                    establishmentImageContainer='max-w-[320px] max-h-[224px]'
                                    hideDescription
                                    establishment={establishment}
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
