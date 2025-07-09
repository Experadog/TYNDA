import {
	formatDistance,
	formatDuration,
	getInstructionIcon,
} from '@/app/[locale]/benefits-map/_helpers';
import type { UseBenefitMapUseCaseType } from '@/app/[locale]/benefits-map/use-cases/useBenefitMapUseCase';
import { useViewModel } from '@/i18n/getTranslate';
import { TRANSPORT_TYPE_ICONS } from '@/lib';
import { type OpenRouteStep, OpenRouteTransportModeEnum } from '@business-entities';
import type { UniversalListItem } from '@common';
import { Button } from '@components';
import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import { FaRoute } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import { useMap } from 'react-leaflet';

const NavigationSidebar = ({ useCase }: { useCase: UseBenefitMapUseCaseType }) => {
	const { transport_type, maneuvers } = useViewModel(['Shared']);

	const {
		route: { isNavSidebar, handleSetIsNavSidebar, routeInfo, handleSetRouteInfo, routingRef },
		map: { disablePointers, enablePointers },
		detailedMarker: { detailedEstMarker },
		user: { address, coords },
		transport: { transportMode, handleSetTransportMode },
		params: { category },
	} = useCase;

	const map = useMap();

	const transports: UniversalListItem<OpenRouteTransportModeEnum>[] = useMemo(() => {
		return Object.values(OpenRouteTransportModeEnum).map((value, index) => ({
			title: transport_type[value],
			icon: TRANSPORT_TYPE_ICONS[index],
			value,
		}));
	}, [transport_type]);

	function getLocalizedInstruction(step: OpenRouteStep): string {
		const key = step.type.toString() as keyof typeof maneuvers;
		const prefix = maneuvers[key] || step.instruction;

		const match = step.instruction.match(/(?:onto|on|to)\s+(.+)$/i);
		let street = match ? match[1].trim() : '';

		if (/^(the\s+)?(left|right)$/i.test(street)) {
			street = '';
		}

		return street ? `${prefix} на ${street}` : prefix;
	}

	const clearRoute = () => {
		handleSetIsNavSidebar(false);
		handleSetRouteInfo(null);
		handleSetTransportMode(OpenRouteTransportModeEnum.FOOT_WALKING);
		enablePointers();

		if (routingRef.current) {
			map.removeLayer(routingRef.current);
		}
	};

	const onOpenSideBar = () => {
		if (!coords || !detailedEstMarker) return;

		map.fitBounds(
			[
				[coords[0], coords[1]],
				[detailedEstMarker?.coordinates.latitude, detailedEstMarker?.coordinates.longitude],
			],
			{
				padding: [400, 50],
				paddingBottomRight: [200, 50],
				animate: true,
			},
		);
		handleSetIsNavSidebar(true);
	};

	useEffect(() => {
		clearRoute();
	}, [category]);

	if (!coords || !routeInfo) return null;

	return (
		<>
			{!isNavSidebar && (
				<Button
					onClick={onOpenSideBar}
					variant={'yellow'}
					size={'icon'}
					className="absolute top-3 left-3 z-[999] rounded-full shadow-lg flex-shrink-0"
					aria-label={'Открыть маршрут'}
				>
					<FaRoute className="size-6" />
				</Button>
			)}

			<div
				onMouseEnter={disablePointers}
				onMouseLeave={enablePointers}
				className={`
					absolute top-0 left-0 h-full bg-background_1 shadow-lg z-[999]
					w-[320px] max-w-full p-4 flex flex-col gap-3
					transform transition-transform duration-300 ease-in-out
					pointer-events-auto
					${isNavSidebar ? 'translate-x-0' : '-translate-x-full'}
				`}
			>
				<div className="border-b border-light_gray pb-2 mb-4 flex justify-between ">
					<div>
						<h2 className="text-xl font-semibold">
							Маршрут до:
							<br />
							<span>{detailedEstMarker?.name}</span>
						</h2>
						<p className="text-xs text-gray mt-1">
							📍 От:{' '}
							<strong>
								{address || 'Мое местоположение'} {coords?.join(' • ')}
							</strong>
						</p>
					</div>

					{isNavSidebar && (
						<Button
							onClick={() => handleSetIsNavSidebar(false)}
							variant={'yellow'}
							size={'icon'}
							className="rounded-full shadow-lg flex-shrink-0"
							aria-label={'Закрыть маршрут'}
						>
							<IoCloseOutline className="size-6" />
						</Button>
					)}
				</div>
				<div className="grid grid-cols-3 gap-3">
					{transports.map((item) => {
						const Icon = item.icon;

						const isActive = transportMode === item.value;

						return (
							<div
								onClick={() => handleSetTransportMode(item.value)}
								key={item.value}
								className={clsx(
									'flex flex-col items-center justify-center gap-2 p-2 rounded-xl border transition-colors cursor-pointer text-center',
									'hover:border-yellow hover:text-yellow group',
									isActive
										? 'border-yellow text-yellow'
										: 'border-light_gray text-gray',
								)}
							>
								<Icon size={20} className="transition-colors" />
								<p className="text-xs">{item.title}</p>
							</div>
						);
					})}
				</div>
				<div className="text-sm space-y-1">
					<div className="flex items-center gap-1">
						<p className="text-foreground_1">Длительность:</p>
						<strong className="text-yellow">
							{formatDuration(routeInfo?.summary.duration, 'ч', 'мин')}
						</strong>
					</div>
					<div className="flex items-center gap-1">
						<p className="text-foreground_1">Расстояние:</p>
						<strong className="text-yellow">
							{formatDistance(routeInfo?.summary.distance, 'км', 'м')}
						</strong>
					</div>
				</div>
				<hr className="border-light_gray" />
				<div className="overflow-y-auto flex-grow space-y-4 h-full pb-3">
					{routeInfo?.segments.map((segment, idx) => (
						<div key={`${segment.steps.length}-${idx}`} className="space-y-3">
							{segment.steps.map((step, i) => (
								<div
									key={`${step.type}-${i}`}
									className="flex items-start gap-3 text-xs"
								>
									<div className="text-yellow mt-1 text-sm">
										{getInstructionIcon(step.type)}
									</div>
									<div className="flex flex-col">
										<span className="text-foreground_1 font-medium">
											{getLocalizedInstruction(step)}
										</span>
										<span className="text-gray text-[11px]">
											{formatDistance(step.distance, 'км', 'м')} •{' '}
											{formatDuration(step.duration, 'ч', 'мин')}
										</span>
									</div>
								</div>
							))}
						</div>
					))}
				</div>

				<div className="flex items-center gap-2">
					<Button
						className="bg-error text-white w-full"
						variant={'default'}
						disableAnimation
						size={'sm'}
						onClick={clearRoute}
					>
						Удалить маршрут
					</Button>
				</div>
			</div>
		</>
	);
};

export default NavigationSidebar;
