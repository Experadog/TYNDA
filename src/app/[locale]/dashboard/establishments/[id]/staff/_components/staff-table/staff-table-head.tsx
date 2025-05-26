import { Button } from '@components';
import clsx from 'clsx';
import { useStaffContext } from '../../context/staff-context-provider';

const StaffTableHead = () => {
	const { modal } = useStaffContext();

	return (
		<thead>
			<tr className="bg-background_2">
				<HeaderCell className="border-l-0 w-20">Аватар</HeaderCell>
				<HeaderCell className="w-52">ФИО</HeaderCell>
				<HeaderCell className="w-52">Почта</HeaderCell>
				<HeaderCell className="w-48">Создан</HeaderCell>
				<HeaderCell className="w-52">Взаимодействие</HeaderCell>
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
				'px-4 py-2 border border-light_gray text-left font-semibold border-t-0',
				className,
			)}
		>
			{children}
		</th>
	);
};

export default StaffTableHead;
