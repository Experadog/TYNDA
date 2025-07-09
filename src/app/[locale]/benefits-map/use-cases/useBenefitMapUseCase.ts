import type { EstablishmentMap } from '@business-entities';
import type { Params } from '@common';
import { useDetailedEstMarkerUseCase } from './controllers/useDetailedEstMarkerUseCase';
import { useEstFilterUseCase } from './controllers/useEstFilterUseCase';
import { useEstSearchUseCase } from './controllers/useEstSearchUseCase';
import { useLoadingUseCase } from './controllers/useLoadingUseCase';
import { useRouteInfoUseCase } from './controllers/useRouteInfoUseCase';
import { useTransportModeUseCase } from './controllers/useTransportModeUseCase';
import { useUserCoordsUseCase } from './controllers/useUserCoordsUseCase';
import { useMapUseCase } from './map/useMapUseCase';

type Props = {
	est_map_list: EstablishmentMap[];
	params?: Params;
};

export function useBenefitMapUseCase({ est_map_list, params }: Props) {
	const transport = useTransportModeUseCase();
	const route = useRouteInfoUseCase();
	const loading = useLoadingUseCase();
	const user = useUserCoordsUseCase();
	const detailedMarker = useDetailedEstMarkerUseCase();
	const map = useMapUseCase();
	const search = useEstSearchUseCase();
	const filter = useEstFilterUseCase();

	return {
		filter,
		map,
		est_map_list,
		loading,
		transport,
		route,
		user,
		detailedMarker,
		search,
		params: {
			activeMarkerID: params?.id || null,
			category: params?.category || null,
		},
	};
}

export type UseBenefitMapUseCaseType = ReturnType<typeof useBenefitMapUseCase>;
