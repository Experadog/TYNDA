'use client';

import type { Permission } from '@business-entities';
import { useState } from 'react';
import PermissionSettingsModal from '../modal/permission-settings-modal';
import PermissionItem from './permission-item';

type Props = {
	list: Permission[];
};

const PermissionList = ({ list }: Props) => {
	const [isModal, setIsModal] = useState(false);

	return (
		<div className="flex flex-wrap gap-4">
			{list.map((permission) => (
				<PermissionItem
					key={permission.id}
					item={permission}
					onOpen={() => setIsModal(true)}
				/>
			))}

			<PermissionSettingsModal isOpen={isModal} onClose={() => setIsModal(false)} />
		</div>
	);
};

export default PermissionList;
