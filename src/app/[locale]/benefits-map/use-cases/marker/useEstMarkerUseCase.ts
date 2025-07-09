import {
	type EstablishmentRetrievalDetailedResponseModel,
	getEstablishmentDetail,
} from '@/services';
import type { EstablishmentMap } from '@business-entities';
import { createAction, useAsyncAction, useSetParams } from '@common';
import L from 'leaflet';
import type { UseBenefitMapUseCaseType } from '../useBenefitMapUseCase';

export function useEstMarkerUseCase(useCase: UseBenefitMapUseCaseType, map: L.Map) {
	const { setParam } = useSetParams();

	const {
		detailedMarker: { handleSetDetailedEstMarker, detailedEstMarker },
		loading: { handleSetDetailedLoading, isDetailedLoading },
		route: { handleSetRouteInfo, handleSetIsNavSidebar, routingRef },
	} = useCase;

	const { execute } = useAsyncAction<
		EstablishmentRetrievalDetailedResponseModel,
		[string, boolean]
	>({
		returnDTO: false,
		autoRequest: true,
	});

	const action = createAction({
		requestAction: getEstablishmentDetail,
		onSuccess: (res) => {
			handleSetDetailedEstMarker(res.data.establishment);
			setParam('id', res.data.establishment.id);
			handleSetDetailedLoading(false);
		},
		onError: () => {
			handleSetDetailedLoading(false);
		},
	});

	const fetchDetailed = async (id: string) => {
		handleSetDetailedLoading(true);
		await execute(action, id, false);
	};

	const handleClickMarker = async (estID: string) => {
		if (detailedEstMarker?.id !== estID) {
			handleSetDetailedEstMarker(null);
			handleSetRouteInfo(null);
			handleSetIsNavSidebar(false);

			if (routingRef.current) {
				map.removeLayer(routingRef.current);
			}

			await fetchDetailed(estID);
			return;
		}

		if (!detailedEstMarker && !isDetailedLoading) {
			await fetchDetailed(estID);
		}
	};

	const zoomToMarker = (est: EstablishmentMap) => {
		if (!map) return;

		const latLng = L.latLng(est.coordinates.latitude, est.coordinates.longitude);

		const level = map.getZoom();
		if (level >= 15) {
			map.flyTo(latLng, 8, {
				animate: true,
			});
		} else {
			map.flyTo(latLng, 15, {
				animate: true,
			});
		}
	};

	return { zoomToMarker, handleClickMarker };
}
