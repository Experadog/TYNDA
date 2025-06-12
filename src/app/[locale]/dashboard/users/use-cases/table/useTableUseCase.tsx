import { formatDate } from '@/lib';
import type { UserListItem } from '@business-entities';
import type { ColumnConfigs } from '@common';
import {
	Avatar,
	Button,
	EntityRoleComponent,
	EntityStatusComponent,
	TableRowActions,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@components';

type Props = {
	onOpenCreation: (item?: UserListItem) => void;
};

export function useUsersTableUseCase({ onOpenCreation }: Props) {
	const columns: ColumnConfigs<UserListItem> = [
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
					<TooltipTrigger className="truncate w-full text-start">{value}</TooltipTrigger>
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
			key: 'role',
			title: 'Роль',
			render: (value) => <EntityRoleComponent role={value} is_superuser={false} />,
		},

		{
			key: 'status',
			title: 'Статус',
			render: (value) => <EntityStatusComponent status={value} />,
		},
		{
			key: 'id',
			title: (
				<Button
					disableAnimation
					className="bg-orange text-white w-full"
					onClick={() => onOpenCreation()}
				>
					Добавить
				</Button>
			),
			render: (id) => (
				<TableRowActions onDelete={() => alert(id)} onUpdate={() => alert(id)} />
			),
		},
	];

	return { columns };
}
