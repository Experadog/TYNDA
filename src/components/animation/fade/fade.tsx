import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import type { ClassNameValue } from 'tailwind-merge';
import './fade.css';

interface IProps {
	children: ReactNode;
	duration?: number;
	delay?: number;
	isVisible?: boolean;
	className?: ClassNameValue;
}

const Fade: FC<IProps> = ({ children, duration = 1, delay = 0, isVisible = true, className }) => {
	const mergedClassName = clsx(`fade ${isVisible ? 'fade-in' : 'fade-out'}`, className);

	return (
		<div
			className={mergedClassName}
			style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
		>
			{children}
		</div>
	);
};

export default Fade;
