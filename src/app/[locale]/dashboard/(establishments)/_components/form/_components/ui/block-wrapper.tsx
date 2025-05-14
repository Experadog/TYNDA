import type { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

const BlockWrapper = ({ children }: Props) => {
	return (
		<div className="p-5 bg-background_1 rounded-xl border border-light_gray w-full">
			{children}
		</div>
	);
};

export default BlockWrapper;
