import { UserRole } from '@business-entities';
import { Button } from '@components';
import type { FC } from 'react';

interface IProps {
	onChangeRole: (newRole: UserRole) => void;
	role: UserRole;
}

const RegisterSwitcher: FC<IProps> = ({ onChangeRole, role }) => {
	const handleChangeRole = () => {
		onChangeRole(role === UserRole.CLIENT ? UserRole.ESTABLISHER : UserRole.CLIENT);
	};

	return (
		<div className="w-full flex flex-col items-center gap-5 xs:gap-3">
			<h4 className="text-yellow font-semibold leading-7 text-center text-base xs:text-sm">
				{role === UserRole.CLIENT && 'Вы партнер? Зарегистрируйтесь как предприниматель'}
				{role === UserRole.ESTABLISHER && 'Вы клиент? Зарегистрируйтесь как клиент'}
			</h4>

			<Button
				onClick={handleChangeRole}
				type="button"
				variant={'outline'}
				className="text-yellow border-yellow font-semibold rounded-2xl p-5 xs:p-4"
			>
				{role === UserRole.CLIENT && 'Зарегистрироваться как предприниматель'}
				{role === UserRole.ESTABLISHER && 'Зарегистрироваться как клиент'}
			</Button>
		</div>
	);
};

export default RegisterSwitcher;
