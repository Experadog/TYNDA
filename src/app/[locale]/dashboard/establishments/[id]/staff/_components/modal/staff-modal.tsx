'use client';

import { ROLE_DEFAULT_IDS } from '@/lib';
import type { StaffFormValues } from '@common';
import { DialogWrapper } from '@components';
import { useStaffContext } from '../../context/staff-context-provider';
import StaffForm from '../form/staff-form';

type Props = {
	establishment_id: string;
};

const StaffModal = ({ establishment_id }: Props) => {
	const { modal, schema, create, update } = useStaffContext();
	const {
		actions: { onClose },
		states: { isOpen, selectedStaff },
	} = modal;

	const handleSubmit = async (values: StaffFormValues) => {
		if (!selectedStaff) {
			await create.onCreate(values, establishment_id, [ROLE_DEFAULT_IDS.EST_WORKER]);
		} else {
			await update.onUpdate(values, selectedStaff.id);
		}
	};

	return (
		<DialogWrapper
			isOpen={isOpen}
			onClose={onClose}
			action={selectedStaff ? 'update' : 'create'}
			title={selectedStaff ? 'Редактировать' : 'Создать'}
			disableSubmit={!schema.formState.isDirty}
			buttonForm="staff-form"
		>
			<StaffForm schema={schema} onSubmit={handleSubmit} />
		</DialogWrapper>
	);
};

export default StaffModal;
