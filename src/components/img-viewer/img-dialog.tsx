import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { type Dispatch, type SetStateAction, useState } from 'react';
import Slider from '../slider/slider';
import { Drawer, DrawerContent, DrawerTitle } from '../ui/drawer';
import { LoadingSpinner } from '../ui/loading-spinner';

const ImgDialog = ({
	initialIndex = 0,
	images,
	open,
	setOpen,
}: {
	initialIndex?: number;
	images: string[];
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerContent
				className="p-0 w-screen min-h-screen h-full min-w-96 bg-black border-none z-[9999] rounded-none"
				onClick={() => setOpen(false)}
			>
				<DrawerTitle hidden />

				<div className="relative w-full h-full flex items-center justify-center overflow-hidden">
					<button
						type="button"
						className="fixed top-6 right-6 text-white z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
						onClick={(e) => {
							e.stopPropagation();
							setOpen(false);
						}}
						aria-label="Закрыть просмотрщик"
					>
						<X size={24} />
					</button>
					{images.length > 1 && (
						<button
							type="button"
							className="absolute left-4  top-1/2  text-white bg-black/40 p-3 z-50 rounded-full hover:bg-black/60 transition-colors img-viewer-prev"
							aria-label="Предыдущее изображение"
							onClick={(e) => {
								e.stopPropagation();
							}}
						>
							<ChevronLeft size={20} />
						</button>
					)}

					{images.length > 1 && (
						<button
							type="button"
							className="absolute right-4 top-1/2 z-50 text-white bg-black/40 p-3 rounded-full hover:bg-black/60 transition-colors img-viewer-next"
							aria-label="Следующее изображение"
							onClick={(e) => {
								e.stopPropagation();
							}}
						>
							<ChevronRight size={20} />
						</button>
					)}

					<div className="w-full h-full max-w-[1200px] overflow-hidden relative">
						{!isLoaded && (
							<div className="w-full h-full flex items-center justify-center bg-black/50 z-10">
								<LoadingSpinner className="text-white size-10" />
							</div>
						)}

						<Slider
							key={'img-viewer-slider'}
							loop
							slidesPerView={1}
							rubberband={false}
							navigation={{
								nextEl: '.img-viewer-next',
								prevEl: '.img-viewer-prev',
							}}
							mode="snap"
							fader
							total={images.length}
							initial={initialIndex}
							classNameSlider={'h-full'}
						>
							{images.map((url) => (
								<div
									className=" w-screen h-screen min-w-96  max-w-[1200px] rounded-none"
									key={url}
								>
									<Image
										src={url}
										alt="photo"
										onClick={(e) => {
											e.stopPropagation();
										}}
										onLoad={() => setIsLoaded(true)}
										loading="lazy"
										fill
										className="object-contain"
									/>
								</div>
							))}
						</Slider>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default ImgDialog;
