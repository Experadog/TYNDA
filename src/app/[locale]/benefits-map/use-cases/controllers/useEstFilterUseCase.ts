import { useState } from 'react';

export function useEstFilterUseCase() {
	const [isOpen, setIsOpen] = useState(false);

	const onOpenChange = () => setIsOpen(!isOpen);

	return { onOpenChange, isOpen };
}
