'use client';

import clsx from 'clsx';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { FC, ReactNode, useState } from 'react';
import { ClassNameValue } from 'tailwind-merge';

interface SliderProps {
    children: ReactNode[];
    slidesPerView?: number;
    spacing?: number;
    loop?: boolean;
    classNameChildren?: ClassNameValue;
    classNameSlider?: ClassNameValue;
}

const Slider: FC<SliderProps> = ({ children, slidesPerView = 3, spacing = 10, loop = true, classNameChildren, classNameSlider }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [sliderRef] = useKeenSlider({
        loop,
        mode: 'free-snap',
        slides: {
            perView: slidesPerView,
            spacing,
        },
        drag: true,
        created() {
            setIsLoaded(true);
        },
    });

    return (
        <div className='relative w-full'>
            <div
                className={clsx(`keen-slider transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`, classNameSlider)}
                ref={sliderRef}
            >
                {children.map((child, index) => (
                    <div
                        className={clsx('keen-slider__slide', classNameChildren)}
                        key={index}
                    >
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Slider;
