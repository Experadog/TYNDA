'use client';

import clsx from 'clsx';
import { CSSProperties, FC, ReactNode, useEffect, useRef, useState } from 'react';
import { ClassNameValue } from 'tailwind-merge';
import './translate.css';

interface IProps {
    children: ReactNode;
    duration?: number;
    delay?: number;
    animateOnce?: boolean;
    direction?: 'left' | 'right' | 'up' | 'down';
    distance?: number;
    className?: ClassNameValue;
}

declare module 'react' {
    interface CSSProperties {
        '--distance'?: string;
    }
}

const Translate: FC<IProps> = ({
    children,
    duration = 1,
    delay = 0,
    animateOnce = true,
    direction = 'left',
    distance = 20,
    className,
}) => {
    const [isInViewport, setIsInViewport] = useState(animateOnce);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element || animateOnce) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                requestAnimationFrame(() => {
                    setIsInViewport(entry.isIntersecting);
                });
            },
            { threshold: 0.001 },
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [animateOnce]);

    const style: CSSProperties = {
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        '--distance': `${distance}px`,
    };

    const mergedClassNames = clsx(
        'translate',
        isInViewport ? 'translate-in' : 'translate-out',
        `direction-${direction}`,
        className,
    );

    return (
        <div
            ref={elementRef}
            className={mergedClassNames}
            style={style}
        >
            {children}
        </div>
    );
};

export default Translate;
