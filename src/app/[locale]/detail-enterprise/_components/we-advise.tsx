'use client';
import { FC } from 'react';
import RecommendationCard from '../../(home)/_components/recommendationCard';
import { useDetailEnterpriseUseCase } from '../use-cases/useDetailEnterpriseUseCase';

interface IProps {
    viewModel: ViewModel['DetailEnterprise']['weAdvise'];
}

const WeAdvise: FC<IProps> = ({}) => {
    const { viewModel } = useDetailEnterpriseUseCase();
    return (
        <div className='lg:hidden mb-[145px]'>
            <div className='flex flex-col gap-[20px]'>
                <h3 className='text-lg font-semibold uppercase text-center'>{viewModel.weAdvise.weAdvise}</h3>
                <h2 className='text-4xl font-medium text-center'>{viewModel.weAdvise.similarEnterprise}</h2>
            </div>
            <div className='mt-[30px] grid grid-cols-4 gap-[15px]'>
                {Array.from({ length: 4 }).map((_, index) => (
                    <RecommendationCard key={index} />
                ))}
            </div>
        </div>
    );
};

export default WeAdvise;
