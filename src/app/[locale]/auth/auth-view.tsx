'use client';

import { useUser } from '@/providers/user/user-provider';
import { ImgMask, Translate } from '@components';
import Image from 'next/image';
import { type FC, type ReactNode, useEffect } from 'react';

interface IProps {
	children: ReactNode;
}

const AuthView: FC<IProps> = ({ children }) => {
	const { setUser, user } = useUser();

	useEffect(() => {
		if (user) {
			setUser(null);
		}
	}, []);

	return (
		<div className="relative h-full flex justify-start lg:justify-center lg:items-center gap-20 lg:gap-10 sm:gap-5 full-height overflow-hidden">
			<Image
				src="/auth/auth.webp"
				alt="Background"
				fill
				className="object-cover object-center absolute top-0 left-0 z-0"
				priority
				placeholder="blur"
				blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAAXNSR0IArs4c6QAAAJJJREFUGFcdwz0LgkAcwOHfaRRqNxT5AkJDRC4NjX2Jpr7/0FCGUBrGiZ7nP+iBR52vF6nDjI4A6+TfOYcbLZMxqNNei44T8kNB52meTY+I4/Z48y3vqHAVigJ8z2MeaJxMoIShGxA7otIikaVe4/szolWMGScaO2DaFveqUMl2I9nuiE5zJttTj/BZRFhR9FXJDz7pReraOv8UAAAAAElFTkSuQmCC"
			/>
			<ImgMask />
			<Translate
				direction="right"
				className="relative z-10 w-full max-w-[40%] xl:max-w-[90%] bg-[rgba(31,31,31,0.88)] flex items-center p-5 overflow-hidden lg:rounded-2xl xs:my-3"
			>
				<div className="w-full bg-transparent">{children}</div>
			</Translate>
		</div>
	);
};

export default AuthView;
