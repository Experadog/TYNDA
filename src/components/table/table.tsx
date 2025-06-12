type Props = {
	children: React.ReactNode;
	className?: string;
};

const Table = ({ children, className }: Props) => (
	<table className={`table-fixed border-separate border-spacing-0 w-full ${className}`}>
		{children}
	</table>
);

export default Table;
