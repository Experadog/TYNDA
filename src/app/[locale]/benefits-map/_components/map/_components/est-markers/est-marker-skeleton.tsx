import { Skeleton } from '@components';

const EstMarkerSkeleton = () => {
	return (
		<div className="w-full flex flex-col gap-1 pb-2">
			<div className="absolute top-1 right-1 z-10">
				<Skeleton className="h-4 w-[50px] rounded-full" />
			</div>

			{/* Close button */}
			<div className="absolute top-1/2 -translate-y-1/2 -right-12 z-10">
				<Skeleton className="h-9 w-9 rounded-full" />
			</div>

			{/* Image */}
			<div className="relative w-full h-[100px] rounded-t-xl overflow-hidden">
				<Skeleton className="absolute inset-0 w-full h-full rounded-t-xl" />
			</div>

			{/* Title + Description */}
			<div className="flex flex-col px-2 gap-0.5 mt-2 z-10">
				<Skeleton className="h-4 w-[80%] rounded" />
				<Skeleton className="h-3 w-full rounded" />
				<Skeleton className="h-3 w-[90%] rounded" />
			</div>

			{/* Info blocks: Средний чек / Часы */}
			<div className="flex flex-col gap-1 mt-2 px-2 z-10">
				<Skeleton className="h-3 w-[60%] rounded" />
				<Skeleton className="h-3 w-[70%] rounded" />
			</div>

			{/* Buttons */}
			<div className="flex items-center w-full gap-1 mt-2 px-2 z-10">
				<Skeleton className="h-6 w-1/2 rounded" />
				<Skeleton className="h-6 w-1/2 rounded" />
			</div>

			<div className="flex items-center w-full gap-1 mt-1 px-2 z-10">
				<Skeleton className="h-6 w-full rounded" />
			</div>
		</div>
	);
};

export default EstMarkerSkeleton;
