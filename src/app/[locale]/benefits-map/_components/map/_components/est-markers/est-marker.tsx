import EstablishmentPreview from '@/app/[locale]/dashboard/establishments/_components/establishment-preview';
import { priceFormatter } from '@/lib';
import { useLocale } from '@/providers/locale/locale-provider';
import type { EstablishmentDetailed, EstablishmentMap } from '@business-entities';
import { Button, DrawerTrigger, ImgViewer } from '@components';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { BsImages } from 'react-icons/bs';
import { FaInfo } from 'react-icons/fa';
import { GoClock } from 'react-icons/go';
import { IoCloseOutline } from 'react-icons/io5';
import { LiaMapSignsSolid } from 'react-icons/lia';
import { TbZoomScan } from 'react-icons/tb';
import CommonMarker from '../common-marker/common-marker';
import EstMarkerSkeleton from './est-marker-skeleton';

type Props = {
	item: EstablishmentMap;
	zoomToMarker: (est: EstablishmentMap) => void;
	onCreateRoute: (estMarker: EstablishmentMap, forceRebuild?: boolean) => Promise<void>;
	isDetailedLoading: boolean;
	detailedEstMarker: EstablishmentDetailed | null;
	handleClickMarker: (estID: string) => Promise<void>;
	activeMarkerID: string | null;
};

const EstMarker = ({
	item,
	onCreateRoute,
	zoomToMarker,
	detailedEstMarker,
	isDetailedLoading,
	handleClickMarker,
	activeMarkerID,
}: Props) => {
	const { locale } = useLocale();

	const markerRef = useRef<L.Marker | null>(null);

	const closeMarker = () => {
		markerRef.current?.closePopup();
	};

	useEffect(() => {
		if (activeMarkerID && item.id === activeMarkerID) {
			handleClickMarker(activeMarkerID);
			markerRef.current?.openPopup();
		}
	}, [activeMarkerID]);

	return (
		<CommonMarker
			position={[item.coordinates.latitude, item.coordinates.longitude]}
			ref={markerRef}
			onClick={() => handleClickMarker(item.id)}
		>
			<div className="w-[250px] m-0">
				{isDetailedLoading || !detailedEstMarker ? (
					<EstMarkerSkeleton />
				) : (
					<div className="flex flex-col gap-1 font-roboto relative pb-2 text-[11px] leading-tight">
						{detailedEstMarker?.discount > 0 && (
							<div className="absolute top-1 right-1 bg-orange text-white text-sm font-bold px-1.5 py-0.5 rounded-full shadow-md flex items-center gap-0.5 z-10">
								<span className="text-xs">⭐</span>
								<span>-{detailedEstMarker?.discount}%</span>
							</div>
						)}

						<div className="absolute -right-12 top-0 flex flex-col gap-1 z-[999]">
							<Button
								className="text-white rounded-full bg-error"
								size={'icon'}
								variant={'default'}
								onClick={closeMarker}
								disableAnimation
							>
								<IoCloseOutline className="size-6" />
							</Button>

							<EstablishmentPreview
								title={false}
								height="80%"
								item={detailedEstMarker}
								trigger={
									<DrawerTrigger className="bg-blue-400 rounded-full p-3 hover:opacity-90">
										<FaInfo className="text-white" />
									</DrawerTrigger>
								}
							/>

							<ImgViewer
								images={[detailedEstMarker.cover, ...detailedEstMarker.images]}
								customTrigger={
									<Button
										className="text-white rounded-full"
										size={'icon'}
										variant={'yellow'}
										disableAnimation
									>
										<BsImages className="size-6" />
									</Button>
								}
							/>
						</div>

						<div className="w-full h-[50px]" />
						<Image
							alt={item.id}
							src={detailedEstMarker?.cover || ''}
							fill
							sizes="250px"
							priority
							className="object-cover rounded-xl "
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black via-black/80  to-transparent rounded-xl" />

						<div className="flex flex-col px-2 gap-0.5 z-10">
							<p className="text-white text-xl font-semibold truncate">
								{detailedEstMarker?.translates[locale]?.name}
							</p>

							<p className="text-white/70 text-xs font-normal line-clamp-3">
								{detailedEstMarker?.translates[locale]?.description}
							</p>

							<div className="flex flex-col gap-0.5 mt-2">
								{detailedEstMarker.average_bill && (
									<div className="flex items-center gap-1">
										<AiOutlineDollarCircle className="size-3 text-yellow shrink-0" />
										<span className="font-medium text-white/60 text-sm">
											Средний чек:
										</span>
										<span className="text-sm text-yellow">
											{priceFormatter(detailedEstMarker.average_bill, 'сом')}
										</span>
									</div>
								)}

								{detailedEstMarker.work_time && (
									<div className="flex items-center gap-1">
										<GoClock className="size-3 text-yellow shrink-0" />
										<span className="font-medium text-white/60 text-sm">
											Рабочие часы:
										</span>
										<span className="text-sm text-yellow">
											{detailedEstMarker.work_time === '00:00-00:00'
												? '24/7'
												: detailedEstMarker.work_time}
										</span>
									</div>
								)}
							</div>
						</div>
						<div className="flex items-center w-full gap-1 mt-2 px-2 z-10">
							<Button
								variant="yellow"
								disableAnimation
								size="sm"
								onClick={() => onCreateRoute(item)}
								className="w-full text-sm py-1"
							>
								<LiaMapSignsSolid />
								Маршрут
							</Button>

							<Button
								onClick={() => zoomToMarker(item)}
								disableAnimation
								size="sm"
								variant="yellow"
								className="w-full text-sm py-1"
							>
								<TbZoomScan />
								Масштаб
							</Button>
						</div>
					</div>
				)}
			</div>
		</CommonMarker>
	);
};

export default EstMarker;
