import type { EstablishmentDetailed } from '@business-entities';
import { useState } from 'react';

export function useDetailedEstMarkerUseCase() {
	const [detailedEstMarker, setDetailedEstMarker] = useState<EstablishmentDetailed | null>(null);

	const handleSetDetailedEstMarker = (data: EstablishmentDetailed | null) => {
		setDetailedEstMarker(data);
	};

	return { detailedEstMarker, handleSetDetailedEstMarker };
}
