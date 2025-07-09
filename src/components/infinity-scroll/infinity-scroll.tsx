'use client';

import clsx from 'clsx';
import { type ReactNode, useEffect, useRef } from 'react';
import { LoadingSpinner } from '../ui/loading-spinner';

type InfinityScrollProps<T = void> = {
	children: React.ReactNode;
	onLoadMore: (args?: T) => void | Promise<void>;
	isLoading: boolean;
	hasMore?: boolean;
	args?: T;
	className?: string;
	customLoading?: ReactNode;
};

const InfinityScroll = <T,>({
	children,
	onLoadMore,
	isLoading,
	hasMore = true,
	args,
	className,
	customLoading,
}: InfinityScrollProps<T>) => {
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleScroll = () => {
			const container = containerRef.current;

			if (!container || isLoading || !hasMore) return;

			const { scrollTop, scrollHeight, clientHeight } = container;

			if (scrollTop + clientHeight >= scrollHeight - 50) {
				onLoadMore(args);
			}
		};

		const container = containerRef.current;
		if (container) {
			container.addEventListener('scroll', handleScroll);
		}

		return () => {
			if (container) {
				container.removeEventListener('scroll', handleScroll);
			}
		};
	}, [isLoading, hasMore, args]);

	const loadingNode = customLoading ?? (
		<LoadingSpinner className="text-yellow size-10 mx-auto my-auto" />
	);

	return (
		<div ref={containerRef} className={clsx('overflow-y-auto h-full', className)}>
			{children}
			{isLoading && loadingNode}
		</div>
	);
};

export default InfinityScroll;
