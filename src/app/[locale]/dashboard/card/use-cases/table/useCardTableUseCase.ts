import { useViewModel } from '@/i18n/getTranslate';
import { formatDate } from '@/lib';
import { useLocale } from '@/providers/locale/locale-provider';
import type { Card } from '@business-entities';
import type { ColumnConfigs } from '@common';

export function useCardTableUseCase() {
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
		},
	];

	return { columns };
}
