import type { Tariff } from '@business-entities';
import { Table, TableBody, TableFooter, TableHeader, TableWrapper } from '@components';
import { useTariffContext } from '../../context/tariff-context-provider';

const TariffTable = () => {
	const { pagination, table } = useTariffContext();

	return (
		<TableWrapper>
			<Table>
				<TableHeader columns={table.columns} />
			</Table>

			<div className="flex-1 overflow-y-auto relative">
				<Table>
					<TableBody<Tariff>
						data={pagination.states.data}
						columns={table.columns}
						loading={pagination.states.isLoading}
					/>
				</Table>
			</div>

			<Table>
				<TableFooter colSpan={table.columns.length} pagination={pagination} />
			</Table>
		</TableWrapper>
	);
};

export default TariffTable;
