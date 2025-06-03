'use client';
import { useViewModel } from '@/i18n/getTranslate';
import { Redo, Undo } from 'lucide-react';
import Image from 'next/image';
import type { FC } from 'react';
import { GiQueenCrown } from "react-icons/gi";
import { PiMountainsBold } from "react-icons/pi";

// Карточки для блока «Почему Tynda?»
const whyLeftCards = [
  {
    icon: <Redo strokeWidth={0.5} className="w-20 h-[70px] rotate-[39deg] xl:hidden" />,
    position: 'top-[-40px] right-[-65px]',
  },
  {
    icon: <Undo strokeWidth={0.5} className="w-20 h-[70px] rotate-[205deg] xl:hidden" />,
    position: 'bottom-[-75px] right-[-10px]',
  },
];

const whyRightCards = [
  {
    icon: <Redo strokeWidth={0.5} className="w-20 h-[70px] rotate-[144deg] xl:hidden" />,
    position: 'bottom-[-75px] left-[-10px]',
  },
  {
    icon: null,
    position: '',
  },
];

// Карточки для блока «Для кого Tynda?»
const forWhomCards = [
  {
    icon: <Image src={'/about/romantic.svg'} alt='romantic icon' width={34} height={34} />,
    justify: 'justify-start pl-16 xl:p-0 xl:justify-center',
    contentStyle: 'max-w-[627px]'
  },
  {
    icon: <PiMountainsBold className="w-[34px] h-[34px] text-white" />,
    justify: 'justify-end xl:p-0 xl:justify-center',
    contentStyle: 'max-w-[635px]'
  },
  {
    icon: <GiQueenCrown className="w-[34px] h-[34px] text-white" />,
    justify: 'justify-start pl-16 xl:p-0 xl:justify-center',
    contentStyle: 'max-w-[625px]'
  },
];

const WhyTynda: FC = () => {
  const viewModel = useViewModel(['AboutCompany']);

  return (
    <div className="mt-12">
      <div className='flex justify-start'>
        <h3 className='text-3xl font-bold text-yellow'>{viewModel.WhyTynda.question1}</h3>
      </div>

      <div className='mt-7'>
        <div className="flex items-center gap-4 xl:flex-col">
          {/* Левая колонка */}
          <div className='flex flex-col gap-14 h-[354px] xl:gap-4  xl:h-auto'>
            {whyLeftCards.map(({ icon, position }, i) => (
              <div key={i} className="bg-background_1 rounded-xl shadow-[0_0_15px_2px_rgba(41,53,61,0.20)] p-6 max-w-[670px] relative">
                <p className="font-bold text-lg text-foreground_1">{viewModel.WhyTynda.whyLeftCards[i]}</p>
                {icon && <div className={`absolute ${position}`}>{icon}</div>}
              </div>
            ))}
          </div>

          {/* Правая колонка */}
          <div className='flex flex-col justify-end gap-28 h-[354px] xl:gap-4 xl:justify-start xl:h-auto'>
            {whyRightCards.map(({ icon, position }, i) => (
              <div key={i} className="bg-yellow rounded-xl shadow-[0_0_15px_2px_rgba(41,53,61,0.20)] p-6 max-w-[670px] relative">
                <p className="font-bold text-white text-lg">{viewModel.WhyTynda.whyRightCards[i]}</p>
                {icon && <div className={`absolute ${position}`}>{icon}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='mt-14'>
        <div className='flex justify-center'>
          <h3 className='text-3xl font-bold'>{viewModel.WhyTynda.question2}</h3>
        </div>

        <div className='flex flex-col gap-6 mt-10'>
          {forWhomCards.map(({ icon, justify, contentStyle }, i) => (
            <div key={i} className={`flex ${justify}`}>
              <div className='flex items-center justify-center gap-6 w-[802px] xl:flex-col'>
                <div className='bg-yellow rounded-full p-9 shadow-[0_0_15px_2px_rgba(41,53,61,0.20)]'>
                  {icon}
                </div>
                <div className='shadow-[0_0_15px_2px_rgba(41,53,61,0.20)] flex items-center pl-[22px] xl:p-5 rounded-[15px] bg-background_1 h-[106px]'>
                  <p className={`text-foreground_1 text-lg xl:text-base font-bold ${contentStyle}`}>{viewModel.WhyTynda.forWhomCards[i]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-14 flex flex-col items-center justify-center gap-9'>
        <h3 className='text-yellow font-bold text-4xl text-center max-w-[900px] xl:text-2xl'>
          {viewModel.WhyTynda.openForYou}
        </h3>
        <p className='text-2xl font-bold text-center xl:text-xl'>
          {viewModel.WhyTynda.yourWay}
        </p>
      </div>
    </div>
  );
};

export default WhyTynda;