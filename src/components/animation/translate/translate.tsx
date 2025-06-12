'use client';

import clsx from 'clsx';
import { type CSSProperties, type FC, type ReactNode, useEffect, useRef, useState } from 'react';
import type { ClassNameValue } from 'tailwind-merge';
import './translate.css';

interface AnimationProps {
	duration?: number;
	delay?: number;
	direction?: 'left' | 'right' | 'up' | 'down';
	distance?: number;
}

interface IProps {
	children: ReactNode;
	duration?: number;
	delay?: number;
	animateOnce?: boolean;
	direction?: 'left' | 'right' | 'up' | 'down';
	distance?: number;
	className?: ClassNameValue;
	open?: boolean;
	onExit?: AnimationProps;
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
	animateOnce = false,
	direction = 'left',
	distance = 20,
	className,
	open,
	onExit,
}) => {
	const [isMounted, setIsMounted] = useState(false);
	const [isRendered, setIsRendered] = useState(open !== undefined ? open : true);
	const [shouldAnimateInClass, setShouldAnimateInClass] = useState(false);
	const [hasIntersectedOnce, setHasIntersectedOnce] = useState(false);

	const elementRef = useRef<HTMLDivElement>(null);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

	const exitDuration = onExit?.duration ?? duration;
	const exitDelay = onExit?.delay ?? 0;
	const exitDirection = onExit?.direction ?? direction;
	const exitDistance = onExit?.distance ?? distance;

	useEffect(() => {
		setIsMounted(true);
		return () => setIsMounted(false);
	}, []);

	useEffect(() => {
		if (!isMounted || !elementRef.current || open !== undefined) return;

		const options = {
			threshold: 0.01,
			rootMargin: '0px',
		};

		observerRef.current = new IntersectionObserver((entries) => {
			const [entry] = entries;

			if (entry.isIntersecting) {
				if (hideTimeout.current) {
					clearTimeout(hideTimeout.current);
					hideTimeout.current = null;
				}
				if (!animateOnce || !hasIntersectedOnce) {
					setHasIntersectedOnce(true);
					setShouldAnimateInClass(true);
				}
			} else if (!animateOnce) {
				hideTimeout.current = setTimeout(() => {
					setShouldAnimateInClass(false);
				}, 1000);
			}
		}, options);

		observerRef.current.observe(elementRef.current);

		return () => {
			if (observerRef.current && elementRef.current) {
				observerRef.current.unobserve(elementRef.current);
			}
			if (hideTimeout.current) {
				clearTimeout(hideTimeout.current);
			}
		};
	}, [animateOnce, hasIntersectedOnce, isMounted, open]);

	useEffect(() => {
		if (!isMounted) return;

		if (open !== undefined) {
			if (open) {
				setIsRendered(true);
				setShouldAnimateInClass(true);
			} else {
				setShouldAnimateInClass(false);
				const timer = setTimeout(
					() => setIsRendered(false),
					exitDuration * 1000 + exitDelay * 1000,
				);
				return () => clearTimeout(timer);
			}
		}
	}, [open, isMounted, exitDuration, exitDelay]);

	const currentDuration = shouldAnimateInClass ? duration : exitDuration;
	const currentDelay = shouldAnimateInClass ? delay : exitDelay;
	const currentDistance = shouldAnimateInClass ? distance : exitDistance;
	const currentDirection = shouldAnimateInClass ? direction : exitDirection;

	const style: CSSProperties = {
		animationDuration: `${currentDuration}s`,
		animationDelay: `${currentDelay}s`,
		'--distance': `${currentDistance}px`,
		opacity: isMounted ? undefined : 1,
		transform: isMounted ? undefined : 'translate3d(0, 0, 0)',
	};

	const mergedClassNames = clsx(
		'translate',
		{
			'translate-in': isMounted && shouldAnimateInClass,
			'translate-out': isMounted && !shouldAnimateInClass,
		},
		`direction-${currentDirection}`,
		className,
		{
			'animate-once': animateOnce && hasIntersectedOnce,
			'ssr-ready': !isMounted,
		},
	);

	if (!isRendered) return null;

	return (
		<div ref={elementRef} className={mergedClassNames} style={style}>
			{children}
		</div>
	);
};

export default Translate;
