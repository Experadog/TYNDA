'use client';
import type { FC } from 'react';

interface IProps { }

const Conductor: FC<IProps> = ({ }) => {
  return (
    <div className="mt-12">
      <h3 className='text-3xl font-semibold text-center max-w-[1332px] mb-12'>
        Tynda — ваш проводник в мир настоящего Кыргызстана, каким вы его ещё не
        <span className='block'>видели.</span>
      </h3>
      <div className='flex flex-col items-center justify-center shadow-[0_0_10px_1px_rgba(41,53,61,0.20)] pt-5 pb-11 rounded-[15px]'>
        <div className='flex items-center justify-center gap-[15px] mb-3'>
          <div className='w-3 h-3 bg-yellow rounded-full'></div>
          <div className='w-3 h-3 bg-yellow rounded-full'></div>
          <div className='w-3 h-3 bg-yellow rounded-full'></div>
        </div>
        <p className='text-2xl font-semibold mb-2 text-center'>
          От уютных юрт под звёздным небом до роскошных VIP-туров — всё в нашем приложении.
        </p>
        <p className='text-2xl font-semibold text-center'>
          Tynda — первая и единственная онлайн-платформа для туризма и отдыха в Кыргызстане, где гармонично сочетаются аутентичность и современный комфорт. Здесь вы найдёте любые варианты путешествий — от душевного отдыха в традиционной юрте до элитных глэмпингов и индивидуальных туров премиум-класса.
        </p>
      </div>
    </div>
  );
};

export default Conductor;
