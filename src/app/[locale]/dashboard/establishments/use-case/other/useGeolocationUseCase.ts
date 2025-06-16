import type { EstablishmentFormValues, EstablishmentSchema } from '@common';
import { useCallback, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';

type Props = {
	schema: EstablishmentSchema;
};

export function useGeolocationUseCase({ schema }: Props) {
	const [isMapOpen, setIsMapOpen] = useState(false);

	const latitude = useWatch({
		control: schema.control,
		name: 'coordinates.latitude',
	});

	const longitude = useWatch({
		control: schema.control,
		name: 'coordinates.longitude',
	});

	const onOpenMap = () => setIsMapOpen(true);
	const onCloseMap = () => setIsMapOpen(false);

	const setSchemaValue = useCallback(
		(value: EstablishmentFormValues['coordinates']) => {
			schema.setValue('coordinates', value, { shouldDirty: true });
		},
		[schema.setValue],
	);

	const resetCoordinates = () => {
		schema.resetField('coordinates');
	};

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
		resetCoordinates();
		triggerSchema();
	}, [setSchemaValue, triggerSchema]);

	const errors = useMemo(() => {
		return schema.formState.errors.coordinates?.message;
	}, [schema.formState.errors.coordinates?.message]);

	const defaultMarkerCoordinates = useMemo((): [number, number] | null => {
		if (latitude && longitude) {
			return [Number(latitude), Number(longitude)];
		}

		return null;
	}, [latitude, longitude]);

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
