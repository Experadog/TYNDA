'use client';

import { FC } from 'react';
import Hero from './_components/hero';

interface IProps {}

const HomeView: FC<IProps> = ({}) => {
    return (
        <div className='flex flex-col h-[1200px]'>
            <Hero />
        </div>
    );
};

export default HomeView;
