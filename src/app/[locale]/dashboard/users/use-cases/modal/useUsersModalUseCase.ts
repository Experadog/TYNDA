import type { UserListItem } from '@business-entities';
import { useState } from 'react';

export function useUsersModalUseCase() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<UserListItem | null>(null);

	const onClose = () => {
		setIsOpen(false);
	};

	const onOpen = (item?: UserListItem) => {
		setIsOpen(true);
		setSelectedUser(item || null);
	};

	const actions = {
		onClose,
		onOpen,
	};

	const states = { isOpen, selectedUser };

	return { actions, states };
}
