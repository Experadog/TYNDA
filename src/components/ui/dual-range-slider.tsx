'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

import { cn } from '@/lib/utils';

interface DualRangeSliderProps extends React.ComponentProps<typeof SliderPrimitive.Root> {
	labelPosition?: 'top' | 'bottom';
	label?: (value: number | undefined) => React.ReactNode;

	sliderBg?: string;
	activeSliderBg?: string;
	thumbClassName?: string;
	labelClassName?: string;
	thumbRing?: string;
	activeLabel?: boolean; // << Новый проп
}

const DualRangeSlider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	DualRangeSliderProps
>(
	(
		{
			className,
			label,
			labelPosition = 'top',
			sliderBg = 'bg-secondary',
			activeSliderBg = 'bg-yellow',
			thumbClassName,
			labelClassName,
			thumbRing = 'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
			activeLabel = true, // default true
			...props
		},
		ref,
	) => {
		const values = Array.isArray(props.value) ? props.value : [props.min ?? 0];
		const min = props.min ?? 0;
		const max = props.max ?? 100;

		// Вычисляем процент позиции каждого thumb'а
		const percent = (val: number) => ((val - min) / (max - min)) * 100;

		return (
			<div
				className={cn(
					'relative w-full',
					labelPosition === 'top' && 'pt-8',
					labelPosition === 'bottom' && 'pb-8',
				)}
			>
				{/* Лейблы */}
				{label && (
					<div className="absolute left-0 top-0 w-full h-full pointer-events-none">
						{values.map((value, index) => {
							const positionClass = labelPosition === 'top' ? '-top-6' : 'top-6';

							if (activeLabel) {
								// Двигающиеся лейблы
								return (
									<div
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										key={index}
										style={{
											left: `${percent(value)}%`,
											transform: 'translateX(-50%)',
										}}
										className={cn(
											'absolute',
											positionClass,
											'text-xs font-medium text-foreground_1',
											labelClassName,
										)}
									>
										{label(value)}
									</div>
								);
							}

							const staticPosition =
								values.length === 1
									? 'left-1/2 -translate-x-1/2'
									: index === 0
										? 'left-0'
										: 'right-0';
							return (
								<div
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={index}
									className={cn(
										'absolute',
										positionClass,
										staticPosition,
										'text-xs font-medium text-foreground_1',
										labelClassName,
									)}
								>
									{label(value)}
								</div>
							);
						})}
					</div>
				)}

				{/* Слайдер */}
				<SliderPrimitive.Root
					ref={ref}
					className={cn(
						'relative flex w-full touch-none select-none items-center',
						className,
					)}
					{...props}
				>
					<SliderPrimitive.Track
						className={cn(
							'relative h-2 w-full grow overflow-hidden rounded-full',
							sliderBg,
						)}
					>
						<SliderPrimitive.Range className={cn('absolute h-full', activeSliderBg)} />
					</SliderPrimitive.Track>

					{values.map((_, index) => (
						<SliderPrimitive.Thumb
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={index}
							className={cn(
								'relative z-10 block h-4 w-4 rounded-full border-2 border-yellow bg-background transition-colors focus-visible:outline-none',
								thumbRing,
								thumbClassName,
							)}
						/>
					))}
				</SliderPrimitive.Root>
			</div>
		);
	},
);

DualRangeSlider.displayName = 'DualRangeSlider';

export { DualRangeSlider };
