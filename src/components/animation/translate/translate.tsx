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
	animateOnce = true,
	direction = 'left',
	distance = 20,
	className,
	open,
	onExit,
}) => {
	const [isRendered, setIsRendered] = useState(open !== undefined ? open : true);

	const [shouldAnimateInClass, setShouldAnimateInClass] = useState(open === true);

	const [isIntersecting, setIsIntersecting] = useState(false);
	const [hasIntersectedOnce, setHasIntersectedOnce] = useState(false);

	const elementRef = useRef<HTMLDivElement>(null);

	const exitDuration = onExit?.duration ?? duration;
	const exitDelay = onExit?.delay ?? 0;
	const exitDirection = onExit?.direction ?? direction;
	const exitDistance = onExit?.distance ?? distance;

	useEffect(() => {
		if (!elementRef.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsIntersecting(entry.isIntersecting);
				if (entry.isIntersecting) {
					setHasIntersectedOnce(true);
				}
			},
			{ threshold: 0.0001 },
		);

		observer.observe(elementRef.current);

		return () => {
			if (elementRef.current) {
				observer.unobserve(elementRef.current);
			}
		};
	}, []);

	useEffect(() => {
		let timeoutId: NodeJS.Timeout | undefined;

		if (open !== undefined) {
			if (open) {
				setIsRendered(true);
				setShouldAnimateInClass(true);
			} else {
				setShouldAnimateInClass(false);
				timeoutId = setTimeout(
					() => {
						setIsRendered(false);
					},
					exitDuration * 1000 + exitDelay * 1000,
				);
			}
		} else {
			if (isIntersecting) {
				if (animateOnce && hasIntersectedOnce) {
					setShouldAnimateInClass(true);
				} else {
					setShouldAnimateInClass(true);
				}
			} else {
				if (!animateOnce && hasIntersectedOnce) {
					setShouldAnimateInClass(false);
				} else if (animateOnce && hasIntersectedOnce) {
					setShouldAnimateInClass(true);
				} else {
					setShouldAnimateInClass(false);
				}
			}
		}

		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [open, isIntersecting, animateOnce, hasIntersectedOnce, exitDuration, exitDelay]);

	const currentDuration = shouldAnimateInClass ? duration : exitDuration;
	const currentDelay = shouldAnimateInClass ? delay : exitDelay;
	const currentDistance = shouldAnimateInClass ? distance : exitDistance;
	const currentDirection = shouldAnimateInClass ? direction : exitDirection;

	const style: CSSProperties = {
		animationDuration: `${currentDuration}s`,
		animationDelay: `${currentDelay}s`,
		'--distance': `${currentDistance}px`,
	};

	const mergedClassNames = clsx(
		'translate',
		shouldAnimateInClass ? 'translate-in' : 'translate-out',
		`direction-${currentDirection}`,
		className,
	);

	if (!isRendered) return null;

	return (
		<div ref={elementRef} className={mergedClassNames} style={style}>
			{children}
		</div>
	);
};

export default Translate;
