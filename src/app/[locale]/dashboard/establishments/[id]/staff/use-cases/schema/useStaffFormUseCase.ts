import { DTOStaffEmptyFields } from '@/dto/dtoEmpty';
import { useViewModel } from '@/i18n/getTranslate';
import type { Staff } from '@business-entities';
import { createStaffSchema } from '@common';
import { useState } from 'react';

export function useStaffFormUseCase() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

	const onClose = () => {
		setIsOpen(false);
	};

	const onOpen = (item?: Staff) => {
		setIsOpen(true);
		setSelectedStaff(item || null);

		if (item) {
			schema.reset(item);
		} else {
			schema.reset(DTOStaffEmptyFields);
		}
	};

	const actions = {
		onClose,
		onOpen,
	};

	const states = { isOpen, selectedStaff };

	const viewModel = useViewModel(['Validation']);
	const schema = createStaffSchema(viewModel, !!selectedStaff);

	return { schema, modal: { states, actions } };
}
