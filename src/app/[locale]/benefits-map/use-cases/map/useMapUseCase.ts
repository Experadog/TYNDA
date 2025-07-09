import type { LeafletMapType } from '@business-entities';
import { useRef, useState } from 'react';

export function useMapUseCase() {
	const [mapType, setMapType] = useState<LeafletMapType>('default');

	const mapRef = useRef<L.Map | null>(null);

	const enablePointers = () => {
		mapRef.current?.dragging.enable();
		mapRef.current?.scrollWheelZoom.enable();
		mapRef.current?.doubleClickZoom.enable();
	};

	const disablePointers = () => {
		mapRef.current?.dragging.disable();
		mapRef.current?.scrollWheelZoom.disable();
		mapRef.current?.doubleClickZoom.disable();
	};

	const changeMapType = (type: LeafletMapType) => {
		setMapType(type);
	};

	return {
		enablePointers,
		disablePointers,
		changeMapType,
		mapType,
		mapRef,
	};
}
