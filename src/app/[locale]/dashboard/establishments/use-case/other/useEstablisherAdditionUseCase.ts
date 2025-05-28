import { useState } from 'react';

type Props = {
	onChangeEstIdValidation: (should: boolean) => void;
};

export function useEstablisherAdditionUseCase({ onChangeEstIdValidation }: Props) {
	const [isEstablisherCreation, setIsEstablisherCreation] = useState(false);

	const activateCreation = () => {
		setIsEstablisherCreation(true);
		onChangeEstIdValidation(false);
	};

	const deactivateCreation = () => {
		setIsEstablisherCreation(false);
		onChangeEstIdValidation(true);
	};

	const states = { isEstablisherCreation };
	const actions = { activateCreation, deactivateCreation };

	return { states, actions };
}
