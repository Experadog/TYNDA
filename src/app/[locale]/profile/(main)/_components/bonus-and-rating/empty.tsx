import { useThemeContext } from '@/providers/theme/theme-provider';
import { FC } from 'react';

interface IProps {
    text?: string;
}

const Empty: FC<IProps> = ({ text }) => {
    const { theme } = useThemeContext();
    const imagePath = `/profile/empty-review${theme === 'dark' ? '-dark' : ''}.svg`;

    return (
        <div className='flex flex-col gap-2 h-full w-full justify-center items-center bg-background_1 rounded-2xl p-4'>
            <div
                aria-label='Empty state illustration'
                className='bg-contain bg-no-repeat w-[200px] h-[200px] mx-auto'
                style={{ backgroundImage: `url(${imagePath})` }}
            />

            <span className='text-foreground_1 font-semibold text-base'>Пока что пусто...</span>
            {text && <span className='text-foreground_2 font-semibold text-sm'>{text}</span>}
        </div>
    );
};

export default Empty;
