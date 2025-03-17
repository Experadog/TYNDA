import { FC } from 'react';

interface IProps {}

const Hero: FC<IProps> = ({}) => {
    return (
        <div>
            <div className='bg-[url("/profile/profile.webp")] h-64 rounded-3xl bg-center bg-cover bg-no-repeat' />
        </div>
    );
};

export default Hero;
