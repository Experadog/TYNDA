import type { ReactNode } from 'react';

type Props = {
	children: ReactNode;
	title: string;
};

const BlockWrapper = ({ children, title }: Props) => {
	return (
		<div className="flex flex-col gap-6 bg-background_1 p-5 rounded-xl border border-light_gray">
			<h3 className="text-foreground_1 font-semibold text-xl">{title}</h3>

			<div className="w-full h-[1px] bg-light_gray" />
			{children}
		</div>
	);
};

export default BlockWrapper;
