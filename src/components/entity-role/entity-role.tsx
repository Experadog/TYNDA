import { UserRole } from '@business-entities';
import clsx from 'clsx';
import { useMemo } from 'react';

type Props = {
	className?: string;
	role: UserRole;
	is_superuser: boolean;
};

const EntityRoleComponent = ({ role, className, is_superuser }: Props) => {
	const label = useMemo((): string => {
		if (is_superuser) return 'Администратор';

		if (role === UserRole.ESTABLISHER) return 'Владелец';
		if (role === UserRole.CLIENT) return 'Клиент';

		return 'Сотрудник';
	}, [role, is_superuser]);

	return <p className={clsx('"font-roboto"', className)}>{label}</p>;
};

export default EntityRoleComponent;
