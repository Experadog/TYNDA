import { OpenRouteTransportModeEnum } from '@business-entities';
import { useState } from 'react';

export function useTransportModeUseCase() {
	const [transportMode, setTransportMode] = useState<OpenRouteTransportModeEnum>(
		OpenRouteTransportModeEnum.FOOT_WALKING,
	);

	const handleSetTransportMode = (mode: OpenRouteTransportModeEnum) => {
		setTransportMode(mode);
	};

	return { transportMode, handleSetTransportMode };
}
