'use client';

import type { EstablishmentSchema } from '@common';
import { Button } from '@components';
import dynamic from 'next/dynamic';
import { useGeolocationUseCase } from '../../../../use-case/other/useGeolocationUseCase';

export const CustomMap = dynamic(() => import('@/components/map/CustomMap'), {
	ssr: false,
});

type Props = {
	schema: EstablishmentSchema;
};

const GeolocationBlock = ({ schema }: Props) => {
	const geolocationUseCase = useGeolocationUseCase({ schema });

	const {
		actions: { onCloseMap, onMark, onOpenMap, onDeleteMark },
		states: { isMapOpen, defaultMarkerCoordinates, errors },
	} = geolocationUseCase;

	return (
		<div className="flex flex-col gap-3 font-roboto w-full max-w-full">
			<div className="flex items-center justify-between">
				<p className="text-foreground_1 text-base font-medium">Укажите объект на карте</p>
				<Button
					type="button"
					variant={'yellow'}
					className="text-sm font-base rounded-lg"
					disableAnimation
					onClick={onOpenMap}
				>
					Открыть карту
				</Button>
			</div>

			{isMapOpen && (
				<div className="fixed top-0 left-0 w-screen h-screen z-[999999] bg-white">
					<Button
						type="button"
						onClick={onCloseMap}
						variant="yellow"
						className="absolute bottom-4 right-4 z-[9999999] text-sm rounded-lg"
					>
						Закрыть
					</Button>

					<CustomMap
						defaultPosition={[41.5089, 74.7241]}
						onMark={onMark}
						onDelete={onDeleteMark}
						isSearch
						defaultMarkerCoordinates={defaultMarkerCoordinates}
					/>
				</div>
			)}

			{errors && (
				<span className="text-error font-semibold text-sm numeric font-roboto text-end">
					{errors}
				</span>
			)}
		</div>
	);
};

export default GeolocationBlock;
