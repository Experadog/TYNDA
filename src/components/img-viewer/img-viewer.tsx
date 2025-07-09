'use client';

import clsx from 'clsx';
import React, { type HTMLAttributes, type ReactElement, useState } from 'react';
import ImgDialog from './img-dialog';

interface ImgViewerProps {
	images: string[];
	initialIndex?: number;
	triggerClassName?: string;
	customTrigger?: ReactElement<HTMLAttributes<HTMLElement>>;
}

const ImgViewer = ({
	images,
	initialIndex = 0,
	triggerClassName,
	customTrigger,
}: ImgViewerProps) => {
	const [open, setOpen] = useState(false);

	const handleClick = () => setOpen(true);

	return (
		<>
			{customTrigger ? (
				React.cloneElement(customTrigger, {
					onClick: handleClick,
				})
			) : (
				<button
					type="button"
					onClick={handleClick}
					className={clsx('absolute inset-0 z-10 cursor-zoom-in', triggerClassName)}
				/>
			)}

			<ImgDialog initialIndex={initialIndex} images={images} open={open} setOpen={setOpen} />
		</>
	);
};

export default ImgViewer;
