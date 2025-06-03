'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { type FC, useMemo } from 'react';

interface IProps {
	size?: 'large' | 'medium' | 'small';
	src: string | undefined;
	className?: string;
}

const fallbackSrc = '/other/avatar-placeholder.webp';

const isValidSrc = (src: string): boolean => {
	try {
		if (src.startsWith('/')) return true;
		new URL(src);
		return true;
	} catch {
		return false;
	}
};

const Avatar: FC<IProps> = ({ size = 'medium', src, className }) => {
	const validSrc = typeof src === 'string' && isValidSrc(src) ? src : fallbackSrc;

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

	return (
		<Image
			alt="avatar"
			width={width}
			priority
			height={height}
			src={validSrc}
			className={clsx('object-cover aspect-square rounded-full', className)}
		/>
	);
};
export default Avatar;
