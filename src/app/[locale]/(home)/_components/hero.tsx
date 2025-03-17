'use client';
import { Button } from '@components';
import { FC } from 'react';
import { useHomeUseCase } from '../use-cases/useHomeUseCase';
import { Translate } from '@components';

interface IProps {
    viewModel: ViewModel['Home']['hero'];
}

const Hero: FC<IProps> = ({}) => {
    const { viewModel } = useHomeUseCase();
    return (
        <div
            className='rounded-[30px] w-full h-[720px] pl-10 pt-[370px] pb-[75px]'
            style={{ backgroundImage: `url('/hero.webp')` }}
        >
            <Translate
                direction='right'
                distance={100}
                animateOnce={false}
            >
                <div className='flex flex-col gap-[25px] max-w-[964px] pr-[250px]'>
                    <h1 className='text-white text-6xl font-bold uppercase tracking-[1.2px]'>
                        SUPARA ETNO <br /> COMPLEX
                    </h1>
                    <Translate
                        direction='right'
                        distance={200}
                        animateOnce={false}
                    >
                        <p className='text-white text-base font-medium'>{viewModel.hero.description}</p>
                    </Translate>
                </div>
            </Translate>
            <Translate
                direction='up'
                distance={60}
                animateOnce={false}
            >
                <Button
                    variant={'yellow'}
                    className='mt-[25px] h-[48px] px-[22px] py-[14px] rounded-[42px]'
                >
                    {viewModel.hero.button}
                </Button>
            </Translate>
        </div>
    );
};

export default Hero;
