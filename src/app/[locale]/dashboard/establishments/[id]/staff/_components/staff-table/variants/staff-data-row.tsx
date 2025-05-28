import { formatDate } from '@/lib';
import type { Staff } from '@business-entities';
import { Avatar, Button } from '@components';
import clsx from 'clsx';
import { Edit, Trash } from 'lucide-react';
import type { ReactNode } from 'react';

type Props = {
	data: Staff[];
	onDelete: (item: Staff) => void;
	onUpdate: (item: Staff) => void;
};

const StaffDataRow = ({ data, onDelete, onUpdate }: Props) => {
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
					<BodyCell className="w-52">
						{item.first_name || item.last_name
							? `${item.first_name || ''} ${item.last_name || ''}`
							: 'Не указано'}
					</BodyCell>
					<BodyCell className="w-52">{item.email}</BodyCell>
					<BodyCell className="w-48 text-gray">
						{formatDate(item.created_time, { showTime: true })}
					</BodyCell>
					<BodyCell className="w-52 text-gray">
						{formatDate(item.last_login_time, { showTime: true }) || 'Отсутствует'}
					</BodyCell>
					<BodyCell className="border-r-0 w-36" align="center">
						<div className="flex justify-end items-center gap-2">
							<Button
								size={'icon'}
								onClick={() => onDelete(item)}
								disableAnimation
								className="hover:bg-error hover:text-white rounded-full shadow-none"
							>
								<Trash size={10} />
							</Button>

							<Button
								size={'icon'}
								disableAnimation
								onClick={() => onUpdate(item)}
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
				'px-4 py-2 border border-light_gray border-t-0 font-normal font-roboto truncate',
				className,
			)}
		>
			{children}
		</td>
	);
};

export default StaffDataRow;
