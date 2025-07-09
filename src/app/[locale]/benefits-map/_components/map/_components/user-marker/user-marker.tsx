import type { UserCoords } from '@business-entities';
import { useEffect } from 'react';
import { TbNavigation } from 'react-icons/tb';
import CommonMarker from '../common-marker/common-marker';

type Props = {
	address: string;
	handleUserCoordsRequest: () => Promise<UserCoords | null>;
	coords: UserCoords | null;
};

const UserMarker = ({ address, coords, handleUserCoordsRequest }: Props) => {
	useEffect(() => {
		if (!address || !coords) {
			handleUserCoordsRequest();
		}
	}, []);

	if (!coords) return null;

	return (
		<CommonMarker position={coords} icon="user">
			<div className="bg-background_1 p-3 rounded-xl shadow-none min-w-[200px] max-w-[260px] text-foreground-1 text-sm space-y-2 border-none">
				<div className="font-semibold text-base text-foreground_1">Вы находитесь здесь</div>

				{address && (
					<div className="text-gray break-words">
						<span className="text-xs text-gray">Адрес:</span>
						<br />
						{address}
					</div>
				)}

				<div className="flex items-center gap-2 pt-2 border-t border-border text-xs text-gray">
					<TbNavigation />
					Текущее местоположение
				</div>
			</div>
		</CommonMarker>
	);
};

export default UserMarker;
