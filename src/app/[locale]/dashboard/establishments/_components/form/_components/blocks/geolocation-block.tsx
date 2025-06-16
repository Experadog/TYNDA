'use client';

import type { EstablishmentSchema } from '@common';
import { Button, CustomFormField, LoadingSpinner } from '@components';
import dynamic from 'next/dynamic';
import { useGeolocationUseCase } from '../../../../use-case/other/useGeolocationUseCase';

export const CustomMap = dynamic(() => import('@/components/map/CustomMap'), {
	ssr: false,
	loading: () => (
		<div className="w-full h-full flex items-center justify-center">
			<LoadingSpinner className="size-6 text-gray" />
		</div>
	),
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
		<div className="flex flex-col gap-4 font-roboto w-full max-w-full">
			<div className="flex items-center justify-between">
				<p className="text-foreground_1 text-base font-medium">
					{defaultMarkerCoordinates?.length ? (
						<>
							Координаты:{' '}
							<span className="text-yellow text-sm">
								{defaultMarkerCoordinates.join('; ')}
							</span>
						</>
					) : (
						'Укажите координаты (на карте или вручную)'
					)}
				</p>

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
			<div className="w-full h-[1px] bg-light_gray flex flex-col gap-3" />

			<div className="flex flex-col gap-3">
				<CustomFormField
					control={schema.control}
					placeholder="Широта"
					name="coordinates.latitude"
					type="number"
				/>

				<CustomFormField
					control={schema.control}
					placeholder="Долгота"
					name="coordinates.longitude"
					type="number"
				/>
			</div>

			{isMapOpen && (
				<div className="fixed top-0 left-0 w-screen h-screen z-[999999] bg-background_1">
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
						protectedScroll={false}
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
