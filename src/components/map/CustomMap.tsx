'use client';

import clsx from 'clsx';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { Button } from '../ui/button';
import SearchControl from './SearchControl';

type Props = {
	defaultPosition: [number, number];
	zoom?: number;
	className?: string;
	onMark?: (coords: [number, number]) => void;
	onDelete?: () => void;
	isSearch?: boolean;
	defaultMarkerCoordinates?: [number, number] | null;
	protectedScroll?: boolean;
	isStaticMark?: boolean;
};

const CustomMap = ({
	defaultPosition,
	zoom = 7,
	className,
	onMark,
	onDelete,
	isSearch,
	defaultMarkerCoordinates = null,
	protectedScroll = true,
	isStaticMark = false,
}: Props) => {
	const [position, setPosition] = useState<[number, number] | null>(defaultMarkerCoordinates);

	const [mapSearchCoords, setMapSearchCoords] = useState<[number, number] | null>(null);
	const mapRef = useRef<L.Map | null>(null);

	const [isLocked, setIsLocked] = useState(protectedScroll ?? false);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const popupJustClosed = useRef(false);

	const customIcon = useMemo(() => {
		const iconElement = document.createElement('div');
		iconElement.innerHTML = `
			<div class="custom-marker-inner">
				<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
					<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
				</svg>
			</div>
		`;

		return L.divIcon({
			html: iconElement,
			className: 'custom-marker-icon',
			iconSize: [24, 24],
			iconAnchor: [12, 24],
		});
	}, []);

	useEffect(() => {
		if (!protectedScroll || !containerRef.current) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (!entry.isIntersecting) {
					setIsLocked(true);
				}
			},
			{
				root: null,
				threshold: 0.1,
			},
		);

		observer.observe(containerRef.current);

		return () => observer.disconnect();
	}, [protectedScroll]);

	const MapClickHandler = () => {
		const map = useMap();

		useEffect(() => {
			mapRef.current = map;
		}, [map]);

		useEffect(() => {
			map.on('popupclose', () => {
				popupJustClosed.current = true;

				setTimeout(() => {
					popupJustClosed.current = false;
				}, 200);
			});
		}, [map]);

		useMapEvents({
			click(e) {
				if (popupJustClosed.current || isStaticMark) {
					popupJustClosed.current = false;
					return;
				}

				const coords: [number, number] = [e.latlng.lat, e.latlng.lng];
				setPosition(coords);
				onMark?.(coords);
			},
		});
		return null;
	};

	const flyTo = useCallback((coords: [number, number] | null, zoom = 15) => {
		if (!coords) return;
		mapRef.current?.flyTo(coords, zoom);
	}, []);

	const handleDeleteMark = () => {
		setTimeout(() => setPosition(null), 300);
		if (onDelete) onDelete();
	};

	useEffect(() => {
		if (mapSearchCoords?.length) {
			setPosition(mapSearchCoords);
			flyTo(mapSearchCoords, 15);
			onMark?.(mapSearchCoords);
		}
	}, [mapSearchCoords, flyTo, onMark]);

	return (
		<div className="w-full h-full relative" ref={containerRef}>
			{isLocked && protectedScroll && (
				<div
					className="absolute inset-0 z-[998] bg-[rgba(31,31,31,0.88)] backdrop-blur-sm flex items-center justify-center cursor-pointer"
					onClick={() => setIsLocked(false)}
				>
					<p className="text-xs text-center p-4 bg-background_1 shadow rounded-xl font-semibold text-foreground_1">
						Нажмите, чтобы активировать карту
					</p>
				</div>
			)}

			{protectedScroll && !isLocked && (
				<Button
					size={'icon'}
					variant={'yellow'}
					disableAnimation
					onClick={() => setIsLocked(true)}
					className="absolute top-2 right-2 z-[998] rounded-full"
				>
					<FaLock className="text-white" />
				</Button>
			)}

			{isSearch && (
				<div className="flex flex-col gap-1 z-[999] absolute right-4 top-4 bg-background_1 p-4  rounded-xl border border-light_gray">
					<SearchControl
						isMarked={!!position?.length}
						onSelect={(coords) => setMapSearchCoords(coords)}
						className="w-60 relative"
					/>

					<div className="flex items-center gap-1">
						<Button
							variant={'default'}
							size={'sm'}
							disabled={!position}
							className="w-full border border-light_gray rounded-l-xl hover:bg-yellow hover:text-white bg-background_1 !transform-none"
							onClick={() => flyTo(position)}
						>
							Найти маркер
						</Button>

						<Button
							variant={'default'}
							className="w-full border border-light_gray rounded-r-xl hover:bg-yellow hover:text-white bg-background_1 !transform-none"
							size={'sm'}
							disabled={!position}
							onClick={handleDeleteMark}
						>
							Удалить маркер
						</Button>
					</div>
				</div>
			)}

			<MapContainer
				center={defaultPosition}
				zoom={zoom}
				className={clsx('w-full h-full', className)}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				<MapClickHandler />

				{position && (
					<Marker position={position} icon={customIcon}>
						<Popup className="p-0">
							<div className="space-y-2 text-foreground_1">
								<div>
									Координаты:
									<p className="text-yellow font-semibold text-xs">
										{position[0].toFixed(5)}, {position[1].toFixed(5)}
									</p>
								</div>
								{!isStaticMark && (
									<button
										type="button"
										onClick={handleDeleteMark}
										className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
									>
										Удалить маркер
									</button>
								)}
							</div>
						</Popup>
					</Marker>
				)}
			</MapContainer>
		</div>
	);
};

export default CustomMap;
