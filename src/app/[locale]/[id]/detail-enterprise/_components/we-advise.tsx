'use client';
import RecommendationCard from '@/app/[locale]/(home)/_components/recommendationCard';
import { Establishment } from '@/services/establishment/establishmentServiceTypes.ts';
import { FC } from 'react';
import { useDetailEnterpriseUseCase } from '../use-cases/useDetailEnterpriseUseCase';

interface IProps {
    viewModel: ViewModel['DetailEnterprise']['weAdvise'];
    allEstablishments: Establishment[];
}

const WeAdvise: FC<IProps> = ({ allEstablishments }) => {
    const { viewModel } = useDetailEnterpriseUseCase();
    return (
        <div className='lg:hidden mb-[145px]'>
            <div className='flex flex-col gap-[20px]'>
                <h3 className='text-lg font-semibold uppercase text-center'>{viewModel.weAdvise.weAdvise}</h3>
                <h2 className='text-4xl font-medium text-center'>{viewModel.weAdvise.similarEnterprise}</h2>
            </div>
            <div className='mt-[30px] grid grid-cols-4 gap-[15px]'>
                {allEstablishments.map((establishment) => (
                    <RecommendationCard key={establishment.id} establishment={establishment} establishmentImageContainer='max-w-[320px] max-h-[322px]' imageClassName='w-[320px] h-[322px]' />

                ))}
            </div>
        </div>
    );
};

export default WeAdvise;
