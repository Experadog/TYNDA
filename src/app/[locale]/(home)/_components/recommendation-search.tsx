import { Button, Fade, Translate } from '@components';
import { FC } from 'react';

interface IProps {}

const RecommendationSearch: FC<IProps> = () => {
    return (
        <Fade duration={2}>
            <Translate
                duration={1}
                direction='up'
            >
                <div className='flex items-center'>
                    <input
                        className='outline-none bg-white px-4 border w-[300px] flex-grow h-[40px] rounded-l-lg'
                        placeholder='Найти заведение...'
                    />
                    <Button className='bg-yellow text-black font-bold h-[40px] rounded-r-lg rounded-l-none'>
                        Поиск
                    </Button>
                </div>
            </Translate>
        </Fade>
    );
};

export default RecommendationSearch;
