import { formatDate } from '@/lib';
import type { UserListItem } from '@business-entities';
import { Avatar, Button, EntityStatusComponent } from '@components';
import clsx from 'clsx';
import { Edit, Trash } from 'lucide-react';
import type { ReactNode } from 'react';

type Props = {
	data: UserListItem[];
};

const UsersDataRow = ({ data }: Props) => {
	return (
		<tbody>
			{data.map((item) => (
				<tr key={item.id}>
					<BodyCell className="border-l-0 w-20" align={'center'}>
						<Avatar
							src={item.avatar || '/other/avatar-placeholder.webp'}
							size="small"
							className="rounded-full border border-shade_gray"
						/>
					</BodyCell>
					<BodyCell className="w-40">
						{item.first_name || item.last_name
							? `${item.first_name || ''} ${item.last_name || ''}`
							: 'Не указано'}
					</BodyCell>
					<BodyCell className="w-52">{item.email}</BodyCell>
					<BodyCell className="w-44 text-gray">
						{formatDate(item.created_time, { showTime: true })}
					</BodyCell>
					<BodyCell className="w-44 text-gray">
						{formatDate(item.last_login_time, { showTime: true }) ||
							'Вход не осуществлен'}
					</BodyCell>
					<BodyCell className="w-28" align="center">
						<EntityStatusComponent status={item.status} />
					</BodyCell>

					<BodyCell className="border-r-0 w-36" align="center">
						<div className="flex justify-end items-center gap-2">
							<Button
								size={'icon'}
								onClick={() => alert('Deletion')}
								disableAnimation
								className="hover:bg-error hover:text-white rounded-full shadow-none"
							>
								<Trash size={10} />
							</Button>

							<Button
								size={'icon'}
								disableAnimation
								onClick={() => alert('Updating')}
								className="hover:bg-orange hover:text-white rounded-full shadow-none"
							>
								<Edit size={10} />
							</Button>
						</div>
					</BodyCell>
				</tr>
			))}
		</tbody>
	);
};

const BodyCell = ({
	children,
	className,
	align,
}: {
	children: ReactNode;
	className?: string;
	align?: 'center' | 'left' | 'right' | 'justify' | 'char' | undefined;
}) => {
	return (
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
};

export default UsersDataRow;
