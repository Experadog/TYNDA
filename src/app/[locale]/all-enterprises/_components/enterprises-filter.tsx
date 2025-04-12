'use client';
import { FC } from 'react';
import RecommendationCard from '../../(home)/_components/recommendationCard';
import { Button } from '@components';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TbFilter } from 'react-icons/tb';
import { useAllEnterprisesUseCase } from '../use-cases/useAllEnterprisesUseCase';

interface IProps {
    viewModel: ViewModel['AllEnterprises']['enterprisesFilter'];
}

const EnterprisesFilter: FC<IProps> = ({}) => {
    const { viewModel } = useAllEnterprisesUseCase();
    return (
        <div className='mt-10 pb-[248px] lg:pb-14 lg:mt-5'>
            <div className='flex items-center gap-5 lg:hidden'>
                <Button className='bg-background_5 hover:bg-yellow text-white flex items-center gap-1 rounded-[22px] w-36 h-10'>
                    {viewModel.enterprisesFilter.button1} <MdKeyboardArrowDown />
                </Button>
                <Button className='bg-background_5 hover:bg-yellow text-white flex items-center gap-1 rounded-[22px] w-36 h-10'>
                    {viewModel.enterprisesFilter.button2} <MdKeyboardArrowDown />
                </Button>
                <Button className='bg-background_5 hover:bg-yellow text-white flex items-center gap-1 rounded-[22px] w-36 h-10'>
                    {viewModel.enterprisesFilter.button3} <MdKeyboardArrowDown />
                </Button>
            </div>
            <div className='hidden w-full lg:flex items-center justify-center'>
                <Button
                    variant='yellow'
                    className='flex items-center gap-2 w-[353px] rounded-[35px]'
                >
                    <TbFilter />
                    {viewModel.enterprisesFilter.button1}
                </Button>
            </div>
            <div className='grid grid-cols-4 lg:grid-cols-2 mt-[60px] lg:mt-[30px] gap-x-5 gap-y-[34px] lg:gap-x-[10px] lg:gap-y-[20px]'>
                {Array.from({ length: 8 }).map((_, index) => (
                    <RecommendationCard key={index} />
                ))}
            </div>
        </div>
    );
};

export default EnterprisesFilter;
