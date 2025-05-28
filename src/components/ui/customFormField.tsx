'use client';

import clsx from 'clsx';
import {
	type CSSProperties,
	type HTMLInputTypeAttribute,
	type ReactNode,
	type Ref,
	useState,
} from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Input } from './input';

interface IProps<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	placeholder: string;
	type: HTMLInputTypeAttribute;
	InputClassName?: string;
	ErrorClassName?: string;
	className?: string;
	ref?: Ref<HTMLInputElement>;
	label?: string;
	inputStyles?: CSSProperties;
	isTextArea?: boolean;
	TextAreaClassName?: string;
	max?: number;
	min?: number;
	postfix?: ReactNode;
}

export const CustomFormField = <T extends FieldValues>({
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
	isTextArea = false,
	TextAreaClassName,
	max,
	min,
	postfix,
}: IProps<T>) => {
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
							className="block mb-2 text-sm font-normal text-gray"
						>
							{label}
						</FormLabel>
					)}
					<FormControl>
						<div className="relative w-full">
							{isTextArea ? (
								<textarea
									{...field}
									placeholder={placeholder}
									name={name}
									className={`outline-none font-normal max-h-[400px] min-h-56 border border-light_gray px-4 py-3 rounded-xl  whitespace-pre-line ${TextAreaClassName || ''}`}
								/>
							) : (
								<>
									<Input
										{...field}
										max={max}
										min={min}
										value={field.value ?? ''}
										className={clsx(
											'outline-none placeholder:text-placeholder placeholder:font-normal rounded-2xl px-4 py-6 numeric border border-light_gray font-normal',
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

									{postfix ? postfix : null}

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
								</>
							)}
						</div>
					</FormControl>

					<div className="flex justify-end w-full text-xs">
						<FormMessage
							className={clsx(
								'text-error numeric font-roboto text-end',
								ErrorClassName,
							)}
						/>
					</div>
				</FormItem>
			)}
		/>
	);
};
