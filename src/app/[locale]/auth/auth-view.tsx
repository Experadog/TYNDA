import type { FC, ReactNode } from 'react';

interface IProps {
	children: ReactNode;
}

const AuthView: FC<IProps> = ({ children }) => {
	return (
		<div className="h-full flex justify-start   gap-20  bg-[url('/auth/auth.webp')] bg-no-repeat bg-cover full-height">
			<div className="z-10 flex-1 max-w-[40%] bg-[rgba(31,31,31,0.88)] flex items-center p-5 overflow-hidden">
				<div className="w-full bg-transparent">{children}</div>
			</div>
		</div>
	);
};

export default AuthView;
