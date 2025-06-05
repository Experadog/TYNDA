import type { FC, ReactNode } from 'react';

interface IProps {
	children: ReactNode;
}

const AuthView: FC<IProps> = ({ children }) => {
	return (
		<div className="h-full flex items-center justify-center gap-20 px-12 lg:pt-8">
			<div className="z-10 flex-1">{children}</div>
			<div className="lg:hidden flex-1 relative h-[658px] bg-contain bg-center bg-[url('/auth/auth.webp')]  bg-no-repeat" />
		</div>
	);
};

export default AuthView;
