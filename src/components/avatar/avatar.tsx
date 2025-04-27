import Image from 'next/image';
import { type FC, useMemo } from 'react';

interface IProps {
	size?: 'large' | 'medium' | 'small';
	src: string;
	className?: string;
}

const Avatar: FC<IProps> = ({ size = 'medium', src, className }) => {
	const [width, height] = useMemo((): [number, number] => {
		switch (size) {
			case 'large':
				return [70, 70];
			case 'medium':
				return [50, 50];
			case 'small':
				return [30, 30];
		}
	}, [size]);

	return <Image alt="avatar" width={width} height={height} src={src} className={className} />;
};

export default Avatar;
