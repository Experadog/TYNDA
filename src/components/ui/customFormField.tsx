'use client';

import clsx from 'clsx';
import {
	type CSSProperties,
	type FC,
	type HTMLInputTypeAttribute,
	type Ref,
	useState,
} from 'react';
import type { Control } from 'react-hook-form';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Input } from './input';

interface IProps {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	control: Control<any>;
	name: string;
	placeholder: string;
	type: HTMLInputTypeAttribute;
	InputClassName?: string;
	ErrorClassName?: string;
	className?: string;
	ref?: Ref<HTMLInputElement>;
	label?: string;
	inputStyles?: CSSProperties;
}

export const CustomFormField: FC<IProps> = ({
	control,
	name,
	placeholder,
	type,
	InputClassName,
	ErrorClassName,
	className,
	ref,
	label,
	inputStyles,
}) => {
	const [isPasswordHidden, setIsPasswordHidden] = useState(true);

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={clsx('relative w-full', className)}>
					{label && (
						<FormLabel
							htmlFor={name}
							className="block mb-2 text-sm font-medium text-gray-700"
						>
							{label}
						</FormLabel>
					)}
					<FormControl>
						<div className="relative w-full">
							<Input
								{...field}
								className={clsx(
									'bg-input_bg border-none outline-none focus:border-none placeholder:text-placeholder rounded-2xl px-4 py-6 font-semibold numeric',
									type === 'password' ? 'pr-10' : '',
									InputClassName,
								)}
								style={inputStyles}
								type={
									type === 'password'
										? !isPasswordHidden
											? 'text'
											: 'password'
										: type
								}
								placeholder={placeholder}
								ref={ref}
							/>
							{type === 'password' && (
								<button
									type="button"
									className="absolute right-4 top-1/2 -translate-y-1/2"
									onClick={() => setIsPasswordHidden((prev) => !prev)}
								>
									{isPasswordHidden ? (
										<IoEyeOff size={20} className="text-shade_gray" />
									) : (
										<IoEye size={20} className="text-shade_gray" />
									)}
								</button>
							)}
						</div>
					</FormControl>

					<div className="flex justify-end w-full text-xs">
						<FormMessage className={clsx('text-error', ErrorClassName)} />
					</div>
				</FormItem>
			)}
		/>
	);
};
