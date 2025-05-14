import type { EstablishmentFormValues, EstablishmentSchema } from '@common';
import { useCallback, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';

type Props = {
	schema: EstablishmentSchema;
};

export function useGeolocationUseCase({ schema }: Props) {
	const [isMapOpen, setIsMapOpen] = useState(false);

	const coordinates =
		useWatch({
			control: schema.control,
			name: 'coordinates',
		}) || {};

	const onOpenMap = () => setIsMapOpen(true);
	const onCloseMap = () => setIsMapOpen(false);

	const setSchemaValue = useCallback(
		(value: EstablishmentFormValues['coordinates']) => {
			console.log(value);
			schema.setValue('coordinates', value, { shouldDirty: true });
		},
		[schema.setValue],
	);

	const triggerSchema = useCallback(() => schema.trigger('coordinates'), [schema]);

	const onMark = useCallback(
		(cords: [number, number]) => {
			const data = {
				latitude: cords[0],
				longitude: cords[1],
			};
			setSchemaValue(data);
			triggerSchema();
		},
		[setSchemaValue, triggerSchema],
	);

	const onDeleteMark = useCallback(() => {
		setSchemaValue({});
		triggerSchema();
	}, [setSchemaValue, triggerSchema]);

	const errors = useMemo(() => {
		return schema.formState.errors.coordinates?.message;
	}, [schema.formState.errors.coordinates?.message]);

	const defaultMarkerCoordinates = useMemo((): [number, number] | null => {
		const { latitude, longitude } = coordinates;

		if (latitude && longitude) return [latitude, longitude];

		return null;
	}, [coordinates]);

	return {
		actions: {
			onOpenMap,
			onCloseMap,
			onMark,
			onDeleteMark,
		},

		states: {
			isMapOpen,
			defaultMarkerCoordinates,
			errors,
		},
	};
}
