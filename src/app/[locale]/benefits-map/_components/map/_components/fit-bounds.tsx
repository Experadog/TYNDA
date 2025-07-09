import type {
	EstablishmentCategory,
	EstablishmentMap,
	LeafletMapType,
	UserCoords,
} from '@business-entities';
import { Button } from '@components';
import { FaMountain, FaRegMap, FaSatellite } from 'react-icons/fa';
import { MdLocationSearching, MdZoomOutMap } from 'react-icons/md';
import { useFitBoundsUseCase } from '../../../use-cases/fit-bounds/useFitBoundsUseCase';

type Props = {
	mapType: LeafletMapType;
	changeMapType: (type: LeafletMapType) => void;
	est_map_list: EstablishmentMap[];
	category: EstablishmentCategory | null;
	userCoords: UserCoords | null;
	requestUserLocation: () => Promise<UserCoords | null>;
};

const FitBounds = ({
	category,
	changeMapType,
	est_map_list,
	mapType,
	userCoords,
	requestUserLocation,
}: Props) => {
	const { handleFitBounds, handleFlyToUser } = useFitBoundsUseCase({
		est_map_list,
		category,
		userCoords,
		requestUserLocation,
	});

	return (
		<div className="absolute z-[999] flex flex-col gap-2 right-2 top-2">
			<Button
				className="text-white rounded-full"
				size="icon"
				variant="yellow"
				disableAnimation
				onClick={handleFitBounds}
				aria-label="Fit bounds to markers"
			>
				<MdZoomOutMap />
			</Button>

			<Button
				className="text-white rounded-full mb-5"
				size="icon"
				variant="yellow"
				disableAnimation
				onClick={handleFlyToUser}
				aria-label="Search user location"
			>
				<MdLocationSearching />
			</Button>

			<MapTypeButton
				icon={<FaRegMap />}
				active={mapType === 'default'}
				onClick={() => changeMapType('default')}
				label="Обычная карта"
			/>

			<MapTypeButton
				icon={<FaSatellite />}
				active={mapType === 'satellite'}
				onClick={() => changeMapType('satellite')}
				label="Спутниковая карта"
			/>

			<MapTypeButton
				icon={<FaMountain />}
				active={mapType === 'topo'}
				onClick={() => changeMapType('topo')}
				label="Топографическая карта"
			/>
		</div>
	);
};

export default FitBounds;

interface MapTypeButtonProps {
	icon: React.ReactNode;
	active: boolean;
	onClick: () => void;
	label: string;
}

const MapTypeButton = ({ icon, active, onClick, label }: MapTypeButtonProps) => (
	<Button
		className={`rounded-full border border-light_gray ${active ? 'bg-yellow text-white' : 'bg-background_1 text-foreground_1'}`}
		size="icon"
		variant="default"
		disableAnimation
		onClick={onClick}
		title={label}
		aria-label={label}
	>
		{icon}
	</Button>
);
