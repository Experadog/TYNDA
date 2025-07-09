import { useEstMarkerUseCase } from '@/app/[locale]/benefits-map/use-cases/marker/useEstMarkerUseCase';
import { useNavigationUseCase } from '@/app/[locale]/benefits-map/use-cases/navigation/useNavigationUseCase';
import type { UseBenefitMapUseCaseType } from '@/app/[locale]/benefits-map/use-cases/useBenefitMapUseCase';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import EstMarker from './est-marker';

const EstMarkers = ({ useCase }: { useCase: UseBenefitMapUseCaseType }) => {
	const map = useMap();

	const mode = useCase.transport.transportMode;

	const { onCreateRoute, refreshRoute } = useNavigationUseCase(useCase, map);
	const { zoomToMarker, handleClickMarker } = useEstMarkerUseCase(useCase, map);

	useEffect(() => {
		refreshRoute();
	}, [mode]);

	return useCase.est_map_list.map((est) => (
		<EstMarker
			key={est.id}
			item={est}
			zoomToMarker={zoomToMarker}
			onCreateRoute={onCreateRoute}
			activeMarkerID={useCase.params.activeMarkerID}
			handleClickMarker={handleClickMarker}
			detailedEstMarker={useCase.detailedMarker.detailedEstMarker}
			isDetailedLoading={useCase.loading.isDetailedLoading}
		/>
	));
};

export default EstMarkers;
