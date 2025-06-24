'use client';

import clsx from 'clsx';
import { useState } from 'react';
import ImgDialog from './img-dialog';

interface ImgViewerProps {
	images: string[];
	initialIndex?: number;
	triggerClassName?: string;
}

const ImgViewer = ({ images, initialIndex = 0, triggerClassName }: ImgViewerProps) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<button
				type="button"
				onClick={() => setOpen(true)}
				className={clsx('absolute inset-0 z-10 cursor-zoom-in', triggerClassName)}
			/>

			<ImgDialog initialIndex={initialIndex} images={images} open={open} setOpen={setOpen} />
		</>
	);
};

export default ImgViewer;
