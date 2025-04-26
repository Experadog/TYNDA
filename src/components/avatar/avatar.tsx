import Image from 'next/image';
import { FC, useMemo } from 'react';

interface IProps {
    size?: 'large' | 'medium' | 'small';
    src: string;
    roundedPrc: string;
}

const Avatar: FC<IProps> = ({ roundedPrc, size = 'medium', src }) => {
    const [width, height] = useMemo((): [number, number] => {
        switch (size) {
            case 'large':
                return [70, 70];
            case 'medium':
                return [50, 50];
            case 'small':
                return [30, 30];
            default:
                return [50, 50];
        }
    }, [size]);

    return (
        <Image
            alt='avatar'
            width={width}
            height={height}
            src={src}
            className={`rounded-[${roundedPrc}%]`}
        />
    );
};

export default Avatar;
