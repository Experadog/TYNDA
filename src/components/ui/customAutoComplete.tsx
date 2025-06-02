'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import { MdOutlineSearchOff } from 'react-icons/md';

import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import clsx from 'clsx';
import { CommandLoading } from 'cmdk';
import Avatar from '../avatar/avatar';
import { LoadingSpinner } from './loading-spinner';

type ItemBase = {
	label: string;
	value: string;
	icon?: React.ReactNode;
	avatar?: string;
};

type Props<T extends ItemBase> = {
	data: T[];
	placeholder?: string;
	value?: string;
	onChange?: (selected: T | undefined) => void;
	onInputChange?: (inputValue: string) => void;
	isLoading?: boolean;
	className?: string;
	showAvatar?: boolean;
	onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
	isPaginationLoading?: boolean;
};

export function CustomAutocomplete<T extends ItemBase>({
	data,
	placeholder = 'Выбери...',
	value,
	onChange,
	onInputChange,
	isLoading,
	showAvatar,
	className,
	onScroll,
	isPaginationLoading,
}: Props<T>) {
	const [open, setOpen] = React.useState(false);
	const [inputValue, setInputValue] = React.useState('');

	React.useEffect(() => {
		const selectedItem = data.find((item) => item.value === value);
		setInputValue(selectedItem ? selectedItem.label : '');
	}, [value, data]);

	const filteredData = React.useMemo(() => {
		if (!inputValue) {
			return data;
		}

		return data.filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase()));
	}, [inputValue, data]);

	React.useEffect(() => {
		if (inputValue === '') {
			onChange?.(undefined);
		}
	}, [inputValue, onChange]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					aria-expanded={open}
					disableAnimation
					className={clsx(
						'w-full outline-none border border-light_gray numeric h-full shadow-none rounded-xl !bg-input_bg font-normal font-roboto flex items-center justify-between gap-2',
						value ? 'text-foreground_1' : 'text-placeholder',
						className,
					)}
					onClick={() => setOpen((o) => !o)}
				>
					<div className="flex items-center gap-2 truncate">
						{showAvatar && value && (
							<Avatar
								src={data.find((item) => item.value === value)?.avatar}
								size="small"
								className="rounded-full shrink-0"
							/>
						)}
						<span className="truncate">{inputValue || placeholder}</span>
					</div>
					<ChevronsUpDown className="opacity-50 shrink-0" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-background_1 border-light_gray font-roboto numeric">
				<Command>
					<CommandInput
						placeholder={placeholder}
						value={inputValue}
						onValueChange={(val) => {
							setInputValue(val);
							onInputChange?.(val);
						}}
						className="p-6"
					/>

					<CommandList className="min-h-[150px]" key={inputValue} onScroll={onScroll}>
						{!filteredData.length && !isLoading && (
							<CommandEmpty className="bg-red-200a absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
								<MdOutlineSearchOff className="size-8 text-muted-foreground hover:text-foreground" />
							</CommandEmpty>
						)}

						<CommandGroup>
							{isLoading ? (
								<CommandLoading>
									<div className="flex justify-center py-2">
										<LoadingSpinner />
									</div>
								</CommandLoading>
							) : (
								<>
									{filteredData.map((item) => (
										<CommandItem
											key={item.value}
											value={item.label}
											onSelect={() => {
												onChange?.(item);
												setInputValue(item.label);
												setOpen(false);
											}}
											className="cursor-pointer hover:bg-orange"
										>
											{showAvatar && (
												<Avatar
													src={item?.avatar}
													size="small"
													className="rounded-full"
												/>
											)}
											{item.label}
											<Check
												className={cn(
													'ml-auto',
													value === item.value
														? 'opacity-100'
														: 'opacity-0',
												)}
											/>
										</CommandItem>
									))}

									{isPaginationLoading && (
										<div className="flex justify-center py-2">
											<LoadingSpinner />
										</div>
									)}
								</>
							)}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
