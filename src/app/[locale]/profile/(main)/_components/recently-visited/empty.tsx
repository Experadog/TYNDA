import { useThemeContext } from '@/providers/theme/theme-provider';
import { FC } from 'react';

const Empty: FC = () => {
    const { theme } = useThemeContext();
    const imagePath = `/profile/empty-recently-visited${theme === 'dark' ? '-dark' : ''}.svg`;

    return (
        <div className='flex flex-col gap-2 h-full w-full justify-center items-center'>
            <div
                aria-label='Empty state illustration'
                className='bg-contain bg-no-repeat w-[200px] h-[200px] mx-auto'
                style={{ backgroundImage: `url(${imagePath})` }}
            />
            <span className='text-foreground_1 font-semibold text-base'>Пока что пусто...</span>
            <span className='text-foreground_2 font-semibold text-sm'>Посетите ваше первое место!</span>
        </div>
    );
};

export default Empty;
