'use client';

import { useRolesContext } from '../../context/roles-context-provider';
import RoleItem from './role-item';

const RoleList = () => {
	const {
		states: { roles },
	} = useRolesContext();

	return (
		<div className="flex flex-col gap-3">
			{roles.items.map((role) => (
				<RoleItem key={role.id} {...role} />
			))}
		</div>
	);
};

export default RoleList;
