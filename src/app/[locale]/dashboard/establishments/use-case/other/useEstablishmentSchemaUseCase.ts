import type { EstablishmentDetailed } from '@business-entities';
import { type EstablishmentFormValues, createEstablishmentSchema } from '@common';
import { useCallback, useState } from 'react';

type Props = {
	defaultValue: EstablishmentDetailed | undefined;
	viewModel: ViewModel['Validation'];
};

export function useEstablishmentSchemaUseCase({ defaultValue, viewModel }: Props) {
	const [shouldValidateEstablisherID, setShouldValidateEstablisherID] = useState(true);

	const prepareDataForSchema = useCallback(
		(establishment: EstablishmentDetailed | undefined): EstablishmentFormValues | undefined => {
			if (!establishment) return undefined;

			const [work_time_start, work_time_end] = establishment.work_time.split('-');

			return {
				...establishment,
				work_time_end,
				work_time_start,
				establisher: undefined,
				establisher_id: undefined,
			};
		},
		[],
	);

	const preparedDefaultValues = prepareDataForSchema(defaultValue);

	const schema = createEstablishmentSchema(
		viewModel,
		shouldValidateEstablisherID,
		preparedDefaultValues,
	);

	return { schema, setShouldValidateEstablisherID };
}
