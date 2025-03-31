import { Skeleton, Translate } from '@components';
import { FC } from 'react';

const RecentlyVisitedSkeleton: FC = () => {
    return (
        <Translate
            direction='up'
            distance={150}
            animateOnce={false}
        >
            <div className='flex flex-col w-full shadow-md rounded-xl overflow-hidden gap-3 border border-background_3 cursor-pointer hover:border-white hover:-translate-y-3 transition-transform flex-shrink-0 relative'>
                <Skeleton className='w-full h-32' />

                <div className='flex flex-col gap-2 p-3'>
                    <Skeleton className='w-3/4 h-6 rounded-md' />

                    <Skeleton className='w-1/2 h-5 rounded-md' />

                    <div className='flex items-center gap-2 px-1'>
                        <Skeleton className='w-12 h-5 rounded-md' />
                        <div className='bg-foreground_1 size-1 rounded-full' />
                        <Skeleton className='w-16 h-5 rounded-md' />
                    </div>
                </div>
            </div>
        </Translate>
    );
};

export default RecentlyVisitedSkeleton;
