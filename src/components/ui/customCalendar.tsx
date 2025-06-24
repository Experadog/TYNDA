import { formatDate, isDate } from '@/lib';
import clsx from 'clsx';
import { CalendarIcon } from 'lucide-react';
import type React from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Button } from './button';
import { Calendar } from './calendar';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Input } from './input';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

interface Props<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	className?: string;
	label?: string;
	showTime?: boolean;
	placeholder: string;
	description?: string;
	showError?: boolean;
	ErrorClassName?: string;
	ButtonClassName?: string;
	TimeInputClassName?: string;
	disablePortal?: boolean;
	disableRuleFlag?: (date: Date) => boolean;
}

const CustomCalendar = <T extends FieldValues>({
	control,
	name,
	className,
	label,
	showTime = false,
	placeholder,
	description,
	showError = true,
	ErrorClassName,
	ButtonClassName,
	disablePortal = false,
	TimeInputClassName,
	disableRuleFlag = () => false,
}: Props<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => {
				const valueDate = isDate(field.value)
					? field.value
					: field.value
						? new Date(field.value)
						: null;

				const timeValue =
					valueDate instanceof Date && !Number.isNaN(valueDate.getTime())
						? valueDate.toTimeString().slice(0, 8)
						: '';
				const displayValue = valueDate ? formatDate(valueDate) : placeholder;

				const onTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
					if (!valueDate) return;
					if (!e.target.value) {
						const newDate = new Date(valueDate);
						newDate.setHours(0, 0, 0);
						field.onChange(newDate);
						return;
					}
					const [hours, minutes, seconds] = e.target.value.split(':').map(Number);
					const newDate = new Date(valueDate);
					newDate.setHours(hours);
					newDate.setMinutes(minutes);
					newDate.setSeconds(seconds || 0);
					field.onChange(newDate.toISOString());
				};

				const calendarSelected =
					valueDate && !Number.isNaN(valueDate.getTime()) ? valueDate : undefined;

				return (
					<FormItem className={clsx('relative w-full p-0 space-y-0', className)}>
						{label && (
							<FormLabel
								htmlFor={name}
								className="block mb-2 text-sm font-normal text-gray"
							>
								{label}
							</FormLabel>
						)}

						<div className="w-full flex gap-2 items-start">
							<FormControl>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant="default"
											disableAnimation
											className={clsx(
												'w-full outline-none placeholder:text-placeholder placeholder:font-normal rounded-xl px-4 py-6 numeric border border-light_gray font-normal bg-input_bg text-foreground_1',
												!field.value && 'text-muted-foreground',
												ButtonClassName,
											)}
										>
											{field.value ? (
												displayValue
											) : (
												<span>{placeholder}</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</PopoverTrigger>

									<PopoverContent
										disablePortal={disablePortal}
										align="start"
										className="bg-background_6 border border-light_gray"
									>
										<Calendar
											mode="single"
											selected={calendarSelected}
											disabled={disableRuleFlag}
											onSelect={(date) => {
												if (!date) return undefined;
												const prev = valueDate ?? new Date();
												date.setHours(
													prev.getHours(),
													prev.getMinutes(),
													prev.getSeconds(),
												);
												field.onChange(date.toISOString());
											}}
											captionLayout="dropdown"
										/>
									</PopoverContent>
								</Popover>
							</FormControl>

							{showTime && (
								<Input
									type="time"
									step="1"
									value={timeValue}
									onChange={onTimeChange}
									className={clsx(
										'w-full outline-none placeholder:text-placeholder placeholder:font-normal rounded-xl px-4 py-6 numeric border border-light_gray font-normal bg-input_bg text-foreground_1',
										TimeInputClassName,
									)}
								/>
							)}
						</div>

						{description && <FormDescription>{description}</FormDescription>}

						{showError && (
							<div className="flex justify-end w-full text-xs">
								<FormMessage
									className={clsx(
										'text-error numeric font-roboto text-end pt-2',
										ErrorClassName,
									)}
								/>
							</div>
						)}
					</FormItem>
				);
			}}
		/>
	);
};

export default CustomCalendar;
