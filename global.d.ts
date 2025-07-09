type RuMessages = typeof import('./messages/ru.json');
type KgMessages = typeof import('./messages/kg.json');
type EnMessages = typeof import('./messages/en.json');

declare interface ViewModel extends RuMessages, KgMessages, EnMessages {}

type PickMessagesByNamespaces<T extends string[]> = T extends (infer U)[]
	? U extends keyof ViewModel
		? { [K in U]: ViewModel[K] }
		: never
	: never;

type CapitalizedKeys<T> = {
	[K in keyof T]: K extends string
		? K extends Capitalize<K>
			? `${K}` | `${K}:${CapitalizedKeys<T[K]>}`
			: never
		: never;
}[keyof T];

declare type IntlNamespaces =
	| CapitalizedKeys<RuMessages>
	| CapitalizedKeys<KgMessages>
	| CapitalizedKeys<EnMessages>;

declare type Locale = 'ru' | 'kg' | 'en';
declare type Theme = 'dark' | 'light';

// types/leaflet-routing-machine.d.ts
declare module 'leaflet-routing-machine' {
	import * as L from 'leaflet';

	export namespace Routing {
		interface RoutingControlOptions extends L.ControlOptions {
			waypoints?: L.LatLng[];
			lineOptions?: L.PolylineOptions;
			routeWhileDragging?: boolean;
			createMarker?: (
				i: number,
				wp: L.Routing.Waypoint,
				nWps: number,
			) => L.Marker | undefined;
		}

		class Control extends L.Control {
			constructor(options?: RoutingControlOptions);
			setWaypoints(waypoints: L.LatLng[]): void;
		}

		function control(options?: RoutingControlOptions): Control;

		class Waypoint {
			constructor(latLng: L.LatLng);
			latLng: L.LatLng;
		}
	}
	const Routing: typeof L.Routing;
	export = Routing;
}
