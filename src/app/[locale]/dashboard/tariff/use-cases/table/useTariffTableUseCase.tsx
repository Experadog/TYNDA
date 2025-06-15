import { useViewModel } from '@/i18n/getTranslate';
import { priceFormatter } from '@/lib';
import { useLocale } from '@/providers/locale/locale-provider';
import type { Tariff } from '@business-entities';
import type { ColumnConfigs } from '@common';
import { Button, TableRowActions } from '@components';

type Props = {
	onMutate: (item?: Tariff) => void;
	onDelete: (item: Tariff) => void;
};

export function useTariffTableUseCase({ onMutate, onDelete }: Props) {
	const viewModel = useViewModel(['Shared']);

	const { locale } = useLocale();

	const columns: ColumnConfigs<Tariff> = [
		{
			key: `translates.${locale}.name`,
			title: 'Название',
		},

		{
			key: 'card_type',
			title: 'Тип',
			render: (value) => viewModel.card_types[value],
		},

		{
			key: 'price',
			title: 'Стоимость',
			render: (value) => priceFormatter(value, 'с'),
		},

		{
			key: 'status',
			title: 'Статус',
			render: (value) => viewModel.entity_status[value],
		},

		{
			key: 'id',
			title: (
				<Button
					className="w-full bg-orange text-white"
					disableAnimation
					onClick={() => onMutate()}
				>
					Добавить
				</Button>
			),
			render: (_, row) => (
				<TableRowActions onDelete={() => onDelete(row)} onUpdate={() => onMutate(row)} />
			),
		},
	];

	return { columns };
}
