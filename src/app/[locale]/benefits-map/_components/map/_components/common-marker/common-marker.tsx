import L from 'leaflet';
import type { ReactNode, RefObject } from 'react';
import { Marker, Popup } from 'react-leaflet';

import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet/dist/leaflet.css';

type BaseProps = {
	children: ReactNode;
	ref?: RefObject<L.Marker | null>;
	icon?: 'user' | 'default';
	position: [number, number];
};

type CommonMarkerProps<T extends (...args: unknown[]) => void> = BaseProps & {
	onClick?: T;
};

const defaultMarker = L.icon({
	iconUrl: '/marker.png',
	iconSize: [32, 32],
	iconAnchor: [16, 32],
	popupAnchor: [0, -50],
});

const userIcon = L.icon({
	iconUrl: '/user-marker.png',
	iconSize: [30, 30],
	iconAnchor: [15, 30],
	popupAnchor: [0, -50],
});

function CommonMarker<T extends (...args: unknown[]) => void>({
	children,
	ref,
	icon = 'default',
	position,
	onClick,
}: CommonMarkerProps<T>) {
	return (
		<Marker
			ref={ref}
			position={position}
			icon={icon === 'default' ? defaultMarker : userIcon}
			eventHandlers={{
				...(onClick && { click: onClick }),
			}}
		>
			<Popup closeButton={false} closeOnClick={false}>
				{children}
			</Popup>
		</Marker>
	);
}

export default CommonMarker;
