import { formatDate } from '@/lib';
import type { Staff } from '@business-entities';
import { type ColumnConfigs, pushCommonToast } from '@common';
import {
	Avatar,
	Button,
	TableRowActions,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@components';

type Props = {
	onOpenModal: (item?: Staff) => void;
	onDelete: (item: Staff) => void;
};

export function useStaffTableUseCase({ onOpenModal, onDelete }: Props) {
	const columns: ColumnConfigs<Staff> = [
		{
			key: 'avatar',
			title: 'Аватар',
			align: 'center',
			className: 'w-20',
			render: (value) => (
				<Avatar
					src={value}
					size="small"
					className="rounded-full border border-shade_gray"
				/>
			),
		},

		{
			key: 'first_name',
			title: 'ФИО',
			render: (_, row) => `${row.first_name || ''} ${row.last_name || ''}`,
		},

		{
			key: 'email',
			title: 'Почта',
			render: (value) => (
				<Tooltip>
					<TooltipTrigger
						onClick={() => {
							navigator.clipboard.writeText(value);
							pushCommonToast('Скопировано!', 'success', { position: 'top-center' });
						}}
						className="truncate w-full text-start"
					>
						{value}
					</TooltipTrigger>
					<TooltipContent className="bg-background_1 font-semibold text-sm font-roboto">
						{value}
					</TooltipContent>
				</Tooltip>
			),
		},

		{
			key: 'created_time',
			title: 'Создан',
			render: (value) => formatDate(value, { showTime: true }),
		},

		{
			key: 'last_login_time',
			title: 'Взаимодействие',
			render: (value) => formatDate(value, { showTime: true }),
		},

		{
			key: 'id',
			title: (
				<Button
					disableAnimation
					className="bg-orange text-white w-full"
					onClick={() => onOpenModal()}
				>
					Добавить
				</Button>
			),

			render: (id, row) => (
				<TableRowActions onDelete={() => onDelete(row)} onUpdate={() => onOpenModal(row)} />
			),
		},
	];

	return { columns };
}
