import type { Tariff } from '@business-entities';
import { Table, TableBody, TableFooter, TableHeader, TableWrapper } from '@components';
import { useTariffContext } from '../../context/tariff-context-provider';

const TariffTable = () => {
	const { tariffPagination, cardPagination, table } = useTariffContext();

	console.log(cardPagination.states.list);

	return (
		<TableWrapper>
			<Table>
				<TableHeader columns={table.columns} />
			</Table>

			<div className="flex-1 overflow-y-auto relative">
				<Table>
					<TableBody<Tariff>
						data={tariffPagination.states.data}
						columns={table.columns}
						loading={tariffPagination.states.isLoading}
					/>
				</Table>
			</div>

			<Table>
				<TableFooter colSpan={table.columns.length} pagination={tariffPagination} />
			</Table>
		</TableWrapper>
	);
};

export default TariffTable;
