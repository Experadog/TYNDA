'use client';
import { FC } from 'react';
import RecomendationCard from './recomendationCard';
import { useHomeUseCase } from '../use-cases/useHomeUseCase';
import { Translate } from '@components';

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
            <div className='mt-[120px] flex flex-col items-center justify-center gap-[20px]'>
                <h3 className='text-lg font-semibold uppercase'>{viewModel.moreRecs.title}</h3>
                <h2 className='text-[34px] font-medium'>{viewModel.moreRecs.description}</h2>
                <div className='mt-[40px] grid grid-cols-2 justify-between gap-[25px]'>
                    <Translate
                        direction='right'
                        distance={100}
                        animateOnce={false}
                    >
                        <div>
                            <RecomendationCard
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
                        <div className='grid grid-cols-2 gap-[25px]'>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <RecomendationCard
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
