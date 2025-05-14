import type { FC } from 'react';

type IProps = {};

const ImgMask: FC<IProps> = ({}) => {
	return <div className="absolute inset-0 bg-black opacity-50"></div>;
};

export default ImgMask;
