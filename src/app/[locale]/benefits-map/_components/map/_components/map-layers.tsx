import type { LeafletMapType } from '@business-entities';
import { TileLayer } from 'react-leaflet';

type Props = {
	mapType: LeafletMapType;
};

const MapLayers = ({ mapType }: Props) => {
	const LAYERS: Record<LeafletMapType, { url: string; attribution: string }> = {
		default: {
			url: 'https://tile.openstreetmap.de/{z}/{x}/{y}.png',
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		},

		satellite: {
			url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
			attribution: '&copy; Esri &mdash; Sources: Esri, USGS, NOAA',
		},

		topo: {
			url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
			attribution: '&copy; OpenTopoMap (CC-BY-SA)',
		},
	};

	return (
		<TileLayer
			{...LAYERS[mapType]}
			className={mapType !== 'default' ? '!filter-none' : ''}
			key={mapType}
		/>
	);
};

export default MapLayers;
