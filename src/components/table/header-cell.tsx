import clsx, { type ClassValue } from 'clsx';

type Props = {
	children: React.ReactNode;
	className?: ClassValue;
	align?: 'left' | 'center' | 'right';
};

const HeaderCell = ({ children, className, align = 'left' }: Props) => (
	<th
		align={align}
		className={clsx(
			'px-3 py-2 border border-light_gray truncate text-left font-semibold border-t-0',
			className,
		)}
	>
		{children}
	</th>
);

export default HeaderCell;
