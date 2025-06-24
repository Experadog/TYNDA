'use client';

import { useUser } from '@/providers/user/user-provider';

const StaffEstablishmentView = () => {
	const { user } = useUser();

	return <div>{user?.staff_establishment?.name}</div>;
};

export default StaffEstablishmentView;
