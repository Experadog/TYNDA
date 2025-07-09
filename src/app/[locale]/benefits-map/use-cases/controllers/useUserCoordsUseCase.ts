import { getAddressReverse } from '@/services/external/externalService';
import type { UserCoords } from '@business-entities';
import { pushCommonToast } from '@common';
import { useState } from 'react';

export function useUserCoordsUseCase() {
	const [coords, setCoords] = useState<UserCoords | null>(null);
	const [address, setAddress] = useState('');

	const handleSetUserCoords = (data: UserCoords) => {
		setCoords(data);
	};

	const handleSetAddress = (data: string) => {
		setAddress(data);
	};

	const fetchAddress = async () => {
		if (!coords) return;

		const response = await getAddressReverse({
			'point.lat': coords[0],
			'point.lon': coords[1],
			layers: ['address', 'country', 'region', 'street'],
		});

		setAddress(response?.features[0]?.properties?.label || '');
	};

	const handleUserCoordsRequest = async (): Promise<UserCoords | null> => {
		if (coords) {
			return coords;
		}

		if (!navigator.geolocation) {
			pushCommonToast('Геолокация не поддерживается вашим браузером.', 'error', {
				removeDelay: 3000,
			});
			return null;
		}

		return new Promise((resolve) => {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const data: UserCoords = [position.coords.latitude, position.coords.longitude];
					setCoords(data);

					if (!address) {
						await fetchAddress();
					}
					resolve(data);
				},
				() => {
					pushCommonToast(
						'Местоположение недоступно. Проверьте доступ в настройках.',
						'info',
						{ removeDelay: 3000, icon: 'ℹ️' },
					);
					setCoords(null);
					resolve(null);
				},
				{
					enableHighAccuracy: true,
					timeout: 10000,
					maximumAge: 0,
				},
			);
		});
	};

	return {
		coords,
		handleSetUserCoords,
		handleUserCoordsRequest,
		handleSetAddress,
		address,
		fetchAddress,
	};
}
