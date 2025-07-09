import { useState } from 'react';

export function useLoadingUseCase() {
	const [isDetailedLoading, setIsDetailedLoading] = useState(false);

	const handleSetDetailedLoading = (flag: boolean) => {
		setIsDetailedLoading(flag);
	};

	return { isDetailedLoading, handleSetDetailedLoading };
}
