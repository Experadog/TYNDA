import type { EstablishmentDetailed } from '@business-entities';
import { type EstablishmentFormValues, createEstablishmentSchema } from '@common';
import { useCallback } from 'react';

type Props = {
	defaultValue: EstablishmentDetailed | undefined;
	viewModel: ViewModel['Validation'];
};

export function useEstablishmentSchemaUseCase({ defaultValue, viewModel }: Props) {
	const prepareDataForSchema = useCallback(
		(establishment: EstablishmentDetailed | undefined): EstablishmentFormValues | undefined => {
			if (!establishment) return undefined;

			const [work_time_start, work_time_end] = establishment.work_time.split('-');

			return {
				...establishment,
				work_time_end,
				work_time_start,
			};
		},
		[],
	);

	const preparedDefaultValues = prepareDataForSchema(defaultValue);

	const schema = createEstablishmentSchema(viewModel, preparedDefaultValues);

	return schema;
}
