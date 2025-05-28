import type { EstablishmentSchema } from '@common';
import { useState } from 'react';

type Props = {
	onChangeEstIdValidation: (should: boolean) => void;
	schema: EstablishmentSchema;
};

export function useEstablisherAdditionUseCase({ onChangeEstIdValidation, schema }: Props) {
	const [isEstablisherCreation, setIsEstablisherCreation] = useState(false);

	const activateCreation = () => {
		setIsEstablisherCreation(true);
		onChangeEstIdValidation(false);
		schema.resetField('establisher_id');
	};

	const deactivateCreation = () => {
		setIsEstablisherCreation(false);
		onChangeEstIdValidation(true);
		schema.resetField('establisher');
	};

	const states = { isEstablisherCreation };
	const actions = { activateCreation, deactivateCreation };

	return { states, actions };
}
