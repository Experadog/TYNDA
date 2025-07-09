'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer } from 'react-leaflet';
import type { UseBenefitMapUseCaseType } from '../../use-cases/useBenefitMapUseCase';
import EstMarkers from './_components/est-markers/est-markers';
import FitBounds from './_components/fit-bounds';
import MapLayers from './_components/map-layers';
import NavigationSidebar from './_components/navigation-sidebar/navigation-sidebar';
import UserMarker from './_components/user-marker/user-marker';

const MainMap = ({ useCase }: { useCase: UseBenefitMapUseCaseType }) => {
	return (
		<div className="w-full full-height">
			<MapContainer
				ref={useCase.map.mapRef}
				center={[42.8746, 74.5698]}
				zoom={13}
				inertia
				className={'w-full h-full relative'}
				scrollWheelZoom={true}
			>
				<MapLayers mapType={useCase.map.mapType} />
				<FitBounds
					category={useCase.params.category}
					changeMapType={useCase.map.changeMapType}
					est_map_list={useCase.est_map_list}
					mapType={useCase.map.mapType}
					userCoords={useCase.user.coords}
					requestUserLocation={useCase.user.handleUserCoordsRequest}
				/>
				<EstMarkers useCase={useCase} />
				<UserMarker
					address={useCase.user.address}
					coords={useCase.user.coords}
					handleUserCoordsRequest={useCase.user.handleUserCoordsRequest}
				/>
				<NavigationSidebar useCase={useCase} />
			</MapContainer>
		</div>
	);
};

export default MainMap;
