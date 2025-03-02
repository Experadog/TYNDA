import { useViewModel } from '@/i18n';
import { Fade, ImgMask } from '@components';
import { FC } from 'react';
import RecommendationSearch from './recommendation-search';

interface IProps {}

const Hero: FC<IProps> = ({}) => {
    const viewModel = useViewModel(['Home']);

    return (
        <div className='relative flex flex-col gap-6 justify-center items-center bg-[url("/hero.webp")] bg-cover h-[450px] pt-16 bg-fixed'>
            <ImgMask />
            <Fade duration={3}>
                <h1 className='text-white font-bold text-4xl text-center relative z-10  '>
                    Там, <br /> где каждый уголок встречает вас с теплотой и радушием <br />
                    {viewModel.title}
                </h1>
            </Fade>

            <RecommendationSearch />
        </div>
    );
};

export default Hero;
