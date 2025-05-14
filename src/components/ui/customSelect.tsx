import clsx from 'clsx';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
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
};

type Props<T extends FieldValues> = {
	placeholder: string;
	className?: string;
	data: Array<SelectItemType>;
	name: Path<T>;
	control: Control<T>;
	label?: string;
	ErrorClassName?: string;
};

const CustomSelect = <T extends FieldValues>({
	placeholder,
	className,
	data,
	name,
	control,
	label,
	ErrorClassName,
}: Props<T>) => {
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
