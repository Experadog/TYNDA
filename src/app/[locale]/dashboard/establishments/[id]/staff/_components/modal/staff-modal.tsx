'use client';

import { ROLE_DEFAULT_IDS } from '@/lib';
import type { StaffFormValues } from '@common';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components';
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
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="bg-background_1 rounded-xl font-roboto">
				<DialogHeader>
					<DialogTitle>{selectedStaff ? 'Редактировать' : 'Создать'}</DialogTitle>
				</DialogHeader>

				<StaffForm schema={schema} onClose={onClose} onSubmit={handleSubmit} />
			</DialogContent>
		</Dialog>
	);
};

export default StaffModal;
