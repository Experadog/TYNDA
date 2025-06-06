import { ImgMask, Translate } from '@components';
import type { FC, ReactNode } from 'react';

interface IProps {
	children: ReactNode;
}

const AuthView: FC<IProps> = ({ children }) => {
	return (
		<div className="h-full flex justify-start  lg:justify-center lg:items-center gap-20 lg:gap-10 sm:gap-5  bg-[url('/auth/auth.webp')] bg-no-repeat bg-cover full-height relative">
			<ImgMask />
			<Translate
				direction="right"
				className="z-1 w-full max-w-[40%] xl:max-w-[90%] bg-[rgba(31,31,31,0.88)] flex items-center p-5 overflow-hidden lg:rounded-2xl xs:my-3"
			>
				<div className="w-full bg-transparent">{children}</div>
			</Translate>
		</div>
	);
};

export default AuthView;
