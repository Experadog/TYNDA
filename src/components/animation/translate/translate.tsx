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

const Translate: FC<IProps> = ({ children, duration = 1, delay = 0, animateOnce = true, direction = 'left', distance = 20, className }) => {
    const [isInViewport, setIsInViewport] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!animateOnce) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsInViewport(true);
                    } else {
                        if (!animateOnce) {
                            setIsInViewport(false);
                        }
                    }
                },
                { threshold: 0.01 },
            );

            if (elementRef.current) {
                observer.observe(elementRef.current);
            }

            return () => {
                if (elementRef.current) {
                    observer.unobserve(elementRef.current);
                }
            };
        } else {
            setIsInViewport(true);
        }
    }, [animateOnce]);

    const style: CSSProperties = {
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        '--distance': `${distance}px`,
    };

    const mergedClassNames = clsx('translate', isInViewport ? 'translate-in' : 'translate-out', `direction-${direction}`, className);

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
