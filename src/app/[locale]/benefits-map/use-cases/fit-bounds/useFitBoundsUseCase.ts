import type { EstablishmentCategory, EstablishmentMap, UserCoords } from '@business-entities';
import L from 'leaflet';
import { useCallback, useEffect } from 'react';
import { useMap } from 'react-leaflet';

type Props = {
	est_map_list: EstablishmentMap[];
	category: EstablishmentCategory | null;

	userCoords: UserCoords | null;
	requestUserLocation: () => Promise<UserCoords | null>;
};

export function useFitBoundsUseCase({
	est_map_list,
	category,
	userCoords,
	requestUserLocation,
}: Props) {
	const map = useMap();

	const handleFitBounds = useCallback((): void => {
		if (!est_map_list.length) return;

		const bounds = L.latLngBounds(
			est_map_list.map((est) => [est.coordinates.latitude, est.coordinates.longitude]),
		);

		map.fitBounds(bounds, {
			paddingTopLeft: [50, 50],
			paddingBottomRight: [50, 50],
			animate: true,
		});
	}, [category, est_map_list.length]);

	const handleFlyToUser = async () => {
		let coords = userCoords;

		if (!coords) {
			coords = await requestUserLocation();
		}

		if (!coords) return;

		map.flyTo(coords, 15, { animate: true });
	};

	useEffect(() => {
		if (!est_map_list.length) return;

		handleFitBounds();
	}, [category, est_map_list.length]);

	return { handleFitBounds, handleFlyToUser };
}
