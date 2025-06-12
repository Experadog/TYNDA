import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-roboto',
	{
		variants: {
			variant: {
				default: 'bg-background_2 text-primary-foreground shadow',
				destructive:
					'bg-destructive text-destructive-foreground shadow-sm hover:brightness-90',
				outline:
					'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:brightness-90',
				secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:brightness-90',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				yellow: 'bg-yellow text-white disabled:bg-gray text-sm font-semibold shadow-none',
			},
			size: {
				default: 'h-9 px-4 py-2',
				sm: 'h-8 rounded-md px-3 text-xs',
				lg: 'h-10 rounded-md px-8',
				icon: 'h-9 w-9',
			},
			clickable: {
				nonClickable: 'cursor-default pointer-events-none',
				default: 'cursor-pointer',
			},
		},

		defaultVariants: {
			variant: 'default',
			size: 'default',
			clickable: 'default',
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	disableAnimation?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			clickable,
			asChild = false,
			disableAnimation = false,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : 'button';

		return (
			<Comp
				{...props}
				type={props.type ? props.type : 'button'}
				className={cn(
					buttonVariants({ variant, size, clickable, className }),

					!disableAnimation
						? 'transition-transform duration-300 active:scale-95 hover:scale-[1.03]'
						: 'hover:brightness-90 transition',
				)}
				ref={ref}
			/>
		);
	},
);

Button.displayName = 'Button';

export { Button, buttonVariants };
