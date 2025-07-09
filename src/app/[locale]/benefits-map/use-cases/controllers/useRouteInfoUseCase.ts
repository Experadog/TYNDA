import type { OpenRoutePreparedType } from '@business-entities';
import { useRef, useState } from 'react';

export function useRouteInfoUseCase() {
	const [routeInfo, setRouteInfo] = useState<OpenRoutePreparedType | null>(null);
	const [isNavSidebar, setIsNavSidebar] = useState(false);

	const handleSetRouteInfo = (data: OpenRoutePreparedType | null) => {
		setRouteInfo(data);
	};

	const handleSetIsNavSidebar = (flag: boolean) => {
		setIsNavSidebar(flag);
	};

	const routingRef = useRef<L.Polyline | null>(null);

	return { routeInfo, handleSetRouteInfo, routingRef, handleSetIsNavSidebar, isNavSidebar };
}
