'use client';

import type { Staff } from '@business-entities';
import { type StaffSchema, staffSchemaDefaultValue } from '@common';
import { useState } from 'react';

export function useStaffModalUseCase({ schema }: { schema: StaffSchema }) {
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
			schema.reset(staffSchemaDefaultValue);
		}
	};

	const actions = {
		onClose,
		onOpen,
	};

	const states = { isOpen, selectedStaff };

	return { actions, states };
}
