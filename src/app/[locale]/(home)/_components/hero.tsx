'use client';
import { Button, Translate } from '@components';
import { FC } from 'react';
import { useHomeUseCase } from '../use-cases/useHomeUseCase';

interface IProps {
    viewModel: ViewModel['Home']['hero'];
}

const Hero: FC<IProps> = ({}) => {
    const { viewModel } = useHomeUseCase();
    return (
        <div className='pt-[10px] lg:pt-0 px-[10px] lg:px-0 max-w-[1420px] m-auto'>
            <div className='rounded-[30px] lg:rounded-none w-full h-[720px] lg:h-[630px] pl-10 lg:pl-5 flex flex-col justify-end gap-9 lg:gap-8 pb-[75px] lg:pb-8 bg-cover bg-center bg-no-repeat bg-[url("/hero.webp")]'>
                <div className='flex flex-col gap-[25px] max-w-[964px] pr-[250px] lg:pr-5'>
                    <Translate
                        direction='right'
                        distance={100}
                        animateOnce={false}
                    >
                        <h1 className='text-white text-6xl md:text-3xl font-bold uppercase tracking-[1.2px]'>
                            SUPARA ETNO <br /> COMPLEX
                        </h1>
                    </Translate>
                    <Translate
                        direction='right'
                        distance={200}
                        animateOnce={false}
                    >
                        <p className='text-white text-base md:text-sm font-medium'>{viewModel.hero.description}</p>
                    </Translate>
                    <Translate
                        direction='left'
                        distance={60}
                        animateOnce={false}
                    >
                        <Button
                            variant={'yellow'}
                            className='h-[48px] px-[22px] py-[14px] rounded-[42px]'
                        >
                            {viewModel.hero.button}
                        </Button>
                    </Translate>
                </div>
            </div>
        </div>
    );
};

export default Hero;
