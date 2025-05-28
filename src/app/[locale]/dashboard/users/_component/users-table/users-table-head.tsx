import { Button } from '@components';
import clsx from 'clsx';
import { useUsersContext } from '../../context/users-context-provider';

const UsersTableHead = () => {
	const { modal } = useUsersContext();

	return (
		<thead>
			<tr className="bg-background_2">
				<HeaderCell className="border-l-0 w-20">Аватар</HeaderCell>
				<HeaderCell className="w-40">ФИО</HeaderCell>
				<HeaderCell className="w-52">Почта</HeaderCell>

				<HeaderCell className="w-44">Создан</HeaderCell>
				<HeaderCell className="w-44">Взаимодействие</HeaderCell>
				<HeaderCell className="w-28">Статус</HeaderCell>

				<HeaderCell className="border-r-0 w-36 text-center" align="center">
					<Button
						className="rounded-lg w-full bg-orange text-white"
						disableAnimation
						onClick={() => modal.actions.onOpen()}
					>
						Добавить
					</Button>
				</HeaderCell>
			</tr>
		</thead>
	);
};

const HeaderCell = ({
	children,
	className,
	align,
}: {
	children?: React.ReactNode;
	className?: string;
	align?: 'center' | 'left' | 'right' | 'justify' | 'char' | undefined;
}) => {
	return (
		<th
			align={align}
			className={clsx(
				'px-3 py-2 border border-light_gray text-left font-semibold border-t-0',
				className,
			)}
		>
			{children}
		</th>
	);
};

export default UsersTableHead;
