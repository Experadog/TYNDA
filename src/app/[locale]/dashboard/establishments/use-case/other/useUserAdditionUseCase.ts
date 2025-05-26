import { useState } from 'react';

export function useUserAdditionUseCase() {
	const [selectedUserID, setSelectedUserID] = useState('');

	const onSelect = (value: string) => {
		setSelectedUserID(value);
	};

	const states = { selectedUserID };
	const actions = { onSelect };

	return { states, actions };
}
