import { useViewModel } from '@/i18n/getTranslate';
import { formatDate } from '@/lib';
import { useLocale } from '@/providers/locale/locale-provider';
import type { Card } from '@business-entities';
import type { ColumnConfigs } from '@common';
import { TableRowActions } from '@components';

type Props = {
	onUpdate: (item: Card) => void;
	onDelete: (item: Card) => void;
};

export function useCardTableUseCase({ onDelete, onUpdate }: Props) {
	const { locale } = useLocale();
	const viewModel = useViewModel(['Shared']);

	const columns: ColumnConfigs<Card> = [
		{
			title: 'Тариф',
			key: `tariff.translates.${locale}.name`,
		},
		{
			title: 'Тип',
			key: 'tariff.card_type',
			render: (value) => viewModel.card_types[value],
		},
		{
			title: 'Дата истечения',
			key: 'expire_date',
			render: (date) => formatDate(date, { showTime: true }),
		},
		{
			title: 'Статус карты',
			key: 'status',
			render: (status) => viewModel.entity_status[status],
		},

		{
			title: '',
			key: 'id',
			render: (_, row) => (
				<TableRowActions onDelete={() => alert(row)} onUpdate={() => onUpdate(row)} />
			),
		},
	];

	return { columns };
}
