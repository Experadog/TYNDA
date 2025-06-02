'use client';

import clsx from 'clsx';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { MdSearchOff } from 'react-icons/md';
import { CustomAutocomplete } from './customAutoComplete';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
import MultipleSelector from './multi-select';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './select';

type SelectItemType = {
	value: string;
	label: string;
	avatar?: string;
};

type Props<T extends FieldValues> = {
	placeholder: string;
	className?: string;
	data: Array<SelectItemType>;
	name: Path<T>;
	control: Control<T>;
	label?: string;
	ErrorClassName?: string;
	isMulti?: boolean;
	multiMaxCount?: number;
	isAutoComplete?: boolean;
	showAvatar?: boolean;
	isInfinityScroll?: boolean;
	onReachEnd?: () => Promise<void>;
	isLoading?: boolean;
	isPaginationLoading?: boolean;
	isEnd?: boolean;
};

const CustomSelect = <T extends FieldValues>({
	placeholder,
	className,
	data,
	name,
	control,
	label,
	ErrorClassName,
	isMulti = false,
	multiMaxCount,
	isAutoComplete,
	showAvatar,
	isInfinityScroll,
	onReachEnd,
	isPaginationLoading,
	isEnd,
}: Props<T>) => {
	const handleScroll = async (e: React.UIEvent<HTMLDivElement>) => {
		if (!isInfinityScroll) return;

		const target = e.currentTarget;
		const nearBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 5;

		if (nearBottom && !isEnd) {
			await onReachEnd?.();
		}
	};

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={clsx('relative w-full space-y-0')}>
					{label && (
						<FormLabel
							htmlFor={name}
							className="block mb-2 text-sm font-medium text-gray-700"
						>
							{label}
						</FormLabel>
					)}

					<FormControl>
						{isMulti ? (
							<MultipleSelector
								{...field}
								options={data}
								placeholder={placeholder}
								className={clsx(
									'outline-none border border-light_gray numeric h-full shadow-none rounded-xl bg-input_bg font-normal font-roboto',
									className,
								)}
								maxSelected={multiMaxCount}
								emptyIndicator={
									<MdSearchOff size={45} className="text-gray m-3 mx-auto" />
								}
							/>
						) : isAutoComplete ? (
							<CustomAutocomplete
								isPaginationLoading={isPaginationLoading}
								onScroll={handleScroll}
								value={field?.value}
								onChange={(item) => field.onChange(item?.value)}
								data={data}
								isLoading={false}
								placeholder={placeholder}
								className={className}
								showAvatar={showAvatar}
							/>
						) : (
							<Select value={field?.value} onValueChange={field.onChange}>
								<SelectTrigger
									className={clsx(
										'outline-none border border-light_gray numeric h-full shadow-none rounded-xl bg-input_bg font-normal font-roboto',
										field.value ? 'text-foreground_1' : 'text-placeholder',
										className,
									)}
								>
									<SelectValue placeholder={placeholder} />
								</SelectTrigger>
								<SelectContent className="bg-background_1 border border-input_bg max-h-52 overflow-y-scroll">
									<SelectGroup>
										{data.map((item) => (
											<SelectItem
												key={item.value}
												value={item.value}
												className="hover:bg-light_gray cursor-pointer font-normal numeric font-roboto"
											>
												{item.label}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						)}
					</FormControl>

					<div className="flex justify-end w-full text-xs">
						<FormMessage
							className={clsx('text-error mt-2 numeric font-roboto', ErrorClassName)}
						/>
					</div>
				</FormItem>
			)}
		/>
	);
};

export default CustomSelect;
