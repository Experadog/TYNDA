'use client';

import { isSuccessOpenRoutePathResponse } from '@/lib';
import { getNavigationPath } from '@/services/external/externalService';
import type {
	OpenRouteNavigationPathRequestModel,
	OpenRouteNavigationPathResponseModel,
} from '@/services/external/externalServiceTypes';
import {
	type EstablishmentMap,
	type OpenRoutePreparedType,
	type OpenRouteResponse,
	OpenRouteTransportModeEnum,
} from '@business-entities';
import { createAction, useAsyncAction, useSetParams } from '@common';
import L from 'leaflet';
import type { UseBenefitMapUseCaseType } from '../useBenefitMapUseCase';

function mapOpenRouteResponse(response: OpenRouteResponse, estID: string): OpenRoutePreparedType {
	const feature = response.features[0];
	const props = feature.properties;
	const coords = feature.geometry.coordinates.map(([lng, lat]) => L.latLng(lat, lng));

	return {
		...props,
		coords,
		estID,
	};
}

export function useNavigationUseCase(useCase: UseBenefitMapUseCaseType, map: L.Map) {
	const {
		est_map_list,
		params: { activeMarkerID },
		transport: { transportMode, handleSetTransportMode },
		user: { coords: userCoords, address, handleUserCoordsRequest, fetchAddress },
		route: { routingRef, handleSetRouteInfo, routeInfo, handleSetIsNavSidebar },
		map: { enablePointers },
	} = useCase;

	const { getParam } = useSetParams();

	const markerId = activeMarkerID || getParam('id');

	const { execute } = useAsyncAction<
		OpenRouteNavigationPathResponseModel,
		[OpenRouteNavigationPathRequestModel]
	>({
		autoRequest: true,
		returnDTO: false,
		isExternal: true,
		throttleTime: 5000,
		onDone: () => {
			enablePointers();
		},
		messages: {
			loading: 'Расчет маршрута...',
			error: 'Невозможно построить маршрут, попробуйте позже или измените вид транспорта',
			success: 'Маршрут успешно построен!',
		},
	});

	const action = createAction({
		requestAction: getNavigationPath,
		customSuccessChecker: isSuccessOpenRoutePathResponse,
		onError: () => {
			handleSetTransportMode(OpenRouteTransportModeEnum.FOOT_WALKING);
			handleSetIsNavSidebar(false);
			handleSetRouteInfo(null);
		},

		onSuccess: (res) => {
			if (!markerId) return;
			const preparedData = mapOpenRouteResponse(res, markerId);
			if (!preparedData) return;

			animatePath(preparedData);
			handleSetRouteInfo(preparedData);
		},
	});

	const handleFetchOpenRoutePath = async (start: L.LatLng, end: L.LatLng) => {
		const payload: OpenRouteNavigationPathRequestModel = {
			from: [start.lng, start.lat],
			to: [end.lng, end.lat],
			transportMode,
		};

		await execute(action, payload);
	};

	const animatePath = (routeInfo: OpenRoutePreparedType) => {
		const polyline = L.polyline(routeInfo.coords, {
			color: 'var(--yellow)',
			weight: 5,
		}).addTo(map) as L.Polyline;

		routingRef.current = polyline;
		let index = 0;
		const coords = routeInfo.coords;
		const step = 50;

		function drawNextPoint() {
			if (index >= coords.length) {
				polyline.setLatLngs(coords);
				return;
			}

			const nextCoords = coords.slice(0, index + 1);
			polyline.setLatLngs(nextCoords);
			index += step;

			requestAnimationFrame(() => {
				requestAnimationFrame(drawNextPoint);
			});
		}

		drawNextPoint();
	};

	const fitBounds = (start: L.LatLng, end: L.LatLng) => {
		map.fitBounds(
			[
				[start.lat, start.lng],
				[end.lat, end.lng],
			],
			{
				padding: [400, 50],
				paddingBottomRight: [200, 50],
				animate: true,
			},
		);
	};

	const onCreateRoute = async (estMarker: EstablishmentMap, forceRebuild = false) => {
		let thisUserCoords = userCoords;

		if (!thisUserCoords) {
			thisUserCoords = await handleUserCoordsRequest();
		}

		if (!thisUserCoords) return;

		const start = L.latLng(thisUserCoords[0], thisUserCoords[1]);
		const end = L.latLng(estMarker.coordinates.latitude, estMarker.coordinates.longitude);

		if (!forceRebuild && routeInfo?.estID === estMarker.id) {
			handleSetIsNavSidebar(true);
			fitBounds(start, end);
			return;
		}

		if (routingRef.current) {
			map.removeLayer(routingRef.current);
			routingRef.current = null;
			handleSetRouteInfo(null);
		}

		handleSetIsNavSidebar(true);

		await handleFetchOpenRoutePath(start, end);

		fitBounds(start, end);

		if (!address) {
			await fetchAddress();
		}
	};

	const refreshRoute = () => {
		if (!userCoords || !markerId || !routingRef?.current || !routeInfo) return;

		if (routingRef.current) {
			map.removeLayer(routingRef.current);
			routingRef.current = null;
			handleSetRouteInfo(null);
		}

		const est = est_map_list.find((e) => e.id === markerId);

		if (!est) return;

		onCreateRoute(est, true);
	};

	return { onCreateRoute, refreshRoute };
}
