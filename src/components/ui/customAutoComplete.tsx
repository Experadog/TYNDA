'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

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
import { CommandLoading } from 'cmdk';
import { LoadingSpinner } from './loading-spinner';

type Item = {
	label: string;
	value: string;
	lat: string;
	lon: string;
};

type Props = {
	data: Item[];
	placeholder?: string;
	value?: string;
	onChange?: (selected: Item) => void;
	onInputChange?: (inputValue: string) => void;
	isLoading: boolean;
};

export function CustomAutocomplete({
	data,
	placeholder = 'Выбери...',
	value,
	onChange,
	onInputChange,
	isLoading,
}: Props) {
	const [open, setOpen] = React.useState(false);
	const [inputValue, setInputValue] = React.useState(value || '');

	const selectedItem = data.find((item) => item.value === value);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" aria-expanded={open} className="w-full justify-between">
					{selectedItem ? selectedItem.label : inputValue || placeholder}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command>
					<CommandInput
						placeholder={placeholder}
						value={inputValue}
						onValueChange={(value) => {
							setInputValue(value);
							onInputChange?.(value);
						}}
					/>
					<CommandList className="min-h-[150px]" key={inputValue}>
						{!data.length ? <CommandEmpty>Ничего не найдено.</CommandEmpty> : null}

						<CommandGroup>
							{isLoading ? (
								<CommandLoading>
									<LoadingSpinner />
								</CommandLoading>
							) : (
								data.map((item) => (
									<CommandItem
										key={item.value}
										value={item.label}
										onSelect={() => {
											onChange?.(item);
											setInputValue(item.label);
											setOpen(false);
										}}
									>
										{item.label}
										<Check
											className={cn(
												'ml-auto',
												value === item.value ? 'opacity-100' : 'opacity-0',
											)}
										/>
									</CommandItem>
								))
							)}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
