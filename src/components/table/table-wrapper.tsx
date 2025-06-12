type Props = {
	children: React.ReactNode;
};

const TableWrapper = ({ children }: Props) => (
	<div className="w-full h-full mt-0 mb-0">
		<div className="w-full h-full flex flex-col border-light_gray border rounded-lg overflow-hidden bg-background_6">
			{children}
		</div>
	</div>
);

export default TableWrapper;
