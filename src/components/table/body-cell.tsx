import clsx, { type ClassValue } from 'clsx';

type Props = {
	children: React.ReactNode;
	className?: ClassValue;
	align?: 'left' | 'center' | 'right';
};

const BodyCell = ({ children, className, align = 'left' }: Props) => (
	<td
		align={align}
		className={clsx(
			'px-3 py-2 border border-light_gray border-t-0 font-normal font-roboto truncate',
			className,
		)}
	>
		{children}
	</td>
);

export default BodyCell;
