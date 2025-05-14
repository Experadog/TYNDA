'use client';

import clsx from 'clsx';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { type FC, type ReactNode, useEffect, useState } from 'react';
import type { ClassNameValue } from 'tailwind-merge';

interface SliderProps {
	children: ReactNode[];
	slidesPerView?: number;
	spacing?: number;
	loop?: boolean;
	classNameChildren?: ClassNameValue;
	classNameSlider?: ClassNameValue;
	onReachEnd?: () => Promise<void>;
	total?: number;
	page?: number;
	rubberband?: boolean;
}

const Slider: FC<SliderProps> = ({
	children,
	slidesPerView = 3,
	spacing = 10,
	loop = true,
	classNameChildren,
	classNameSlider,
	onReachEnd,
	total,
	rubberband = true,
}) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [number, setNumber] = useState(slidesPerView * 1.1);

	const [sliderRef] = useKeenSlider({
		mode: 'free',
		slides: {
			perView: slidesPerView,
			spacing,
			number: total ? number : undefined,
		},
		loop,
		drag: true,
		rubberband,

		created() {
			setIsLoaded(true);
		},

		async slideChanged(s) {
			const isEnd = s.track.details.rel === s.track.details.maxIdx;

			if (isEnd && onReachEnd) {
				if (total && children.length < total) {
					await onReachEnd();
					setNumber((prev) => prev + 1.1);
				} else {
					setNumber(children.length);
				}
			}
		},
	});

	useEffect(() => {
		if (total && children.length === total) {
			setNumber(total);
		}
	}, [children, total]);

	return (
		<div className="relative w-full">
			<div
				className={clsx(
					`keen-slider transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`,
					classNameSlider,
				)}
				ref={sliderRef}
			>
				{[...children].map((child, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div className={clsx('keen-slider__slide', classNameChildren)} key={index}>
						{child}
					</div>
				))}
			</div>
		</div>
	);
};

export default Slider;
