'use client';

import { DeletionConfirmModal } from '@components';
import { useMemo } from 'react';
import { useStaffContext } from '../../context/staff-context-provider';

const StaffDeletionModal = () => {
	const {
		deletion: {
			confirmModal: { close, isOpen, onConfirm, selectedStaff },
		},
	} = useStaffContext();

	const text = useMemo(() => {
		const info =
			selectedStaff?.first_name && selectedStaff.last_name
				? `${selectedStaff?.first_name} ${selectedStaff.last_name}`
				: selectedStaff?.email;

		return `Вы действительное хотите удалить сотрудника: ${info}`;
	}, [selectedStaff]);

	return <DeletionConfirmModal onClose={close} open={isOpen} onConfirm={onConfirm} text={text} />;
};

export default StaffDeletionModal;
