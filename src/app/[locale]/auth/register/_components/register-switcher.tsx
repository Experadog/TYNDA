import { useViewModel } from '@/i18n/getTranslate';
import { UserRole } from '@business-entities';
import { Button } from '@components';
import type { FC } from 'react';

interface IProps {
	onChangeRole: (newRole: UserRole) => void;
	role: UserRole;
}

const RegisterSwitcher: FC<IProps> = ({ onChangeRole, role }) => {
	const { Auth, Buttons } = useViewModel(['Auth', 'Buttons']);

	const {
		Register: { is_client, is_partner },
	} = Auth;

	const { register_as_client, register_as_partner } = Buttons;

	const handleChangeRole = () => {
		onChangeRole(role === UserRole.CLIENT ? UserRole.ESTABLISHER : UserRole.CLIENT);
	};

	return (
		<div className="w-full flex flex-col items-center gap-5 xs:gap-3">
			<h4 className="text-yellow font-semibold leading-7 text-center text-base xs:text-sm">
				{role === UserRole.CLIENT && is_partner}
				{role === UserRole.ESTABLISHER && is_client}
			</h4>

			<Button
				onClick={handleChangeRole}
				type="button"
				variant={'outline'}
				className="text-yellow border-yellow font-semibold rounded-2xl p-5 xs:p-4"
			>
				{role === UserRole.CLIENT && register_as_partner}
				{role === UserRole.ESTABLISHER && register_as_client}
			</Button>
		</div>
	);
};

export default RegisterSwitcher;
