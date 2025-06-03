'use client';
import { useViewModel } from '@/i18n/getTranslate';
import type { FC } from 'react';

interface IProps { }

const Conductor: FC<IProps> = ({ }) => {
  const viewModel = useViewModel(['AboutCompany']);

  return (
    <div className="mt-12 flex flex-col items-center">
      <h3 className='text-3xl font-semibold text-center max-w-[1150px] mb-12 xl:text-xl'>{viewModel.Conductor.title}</h3>
      <div className='bg-background_1 flex flex-col items-center justify-center shadow-[0_0_10px_1px_rgba(41,53,61,0.20)] pt-5 pb-11 xl:p-5 rounded-[15px]'>
        <div className='flex items-center justify-center gap-[15px] mb-3'>
          <div className='w-3 h-3 bg-yellow rounded-full'></div>
          <div className='w-3 h-3 bg-yellow rounded-full'></div>
          <div className='w-3 h-3 bg-yellow rounded-full'></div>
        </div>
        <p className='text-2xl font-semibold mb-2 text-center xl:text-lg'>{viewModel.Conductor.description1}</p>
        <p className='text-2xl font-semibold text-center xl:text-lg'>{viewModel.Conductor.description2}</p>
      </div>
    </div>
  );
};

export default Conductor;
