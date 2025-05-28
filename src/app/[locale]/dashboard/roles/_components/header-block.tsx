import type { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

const RolesHeaderBlock = ({ children }: Props) => {
	return (
		<div className="w-full py-5 px-4 rounded-xl flex justify-between items-center">
			{children}
		</div>
	);
};

export default RolesHeaderBlock;
