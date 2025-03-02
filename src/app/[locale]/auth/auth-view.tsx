import { ImgMask } from '@components';
import { FC, ReactNode } from 'react';

interface IProps {
    children: ReactNode;
}

const AuthView: FC<IProps> = ({ children }) => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/auth.webp")] bg-cover bg-center relative'>
            <ImgMask />
            <div className='z-10'>{children}</div>
        </div>
    );
};

export default AuthView;
