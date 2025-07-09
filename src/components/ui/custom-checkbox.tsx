'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';

type Props = {
	name: string;
	onChange: (value: boolean) => void;
	checked?: boolean;
	label?: string;
	className?: string;
	iconSize?: number;
};

const CustomCheckbox = ({ name, onChange, checked, label, className, iconSize = 20 }: Props) => {
	const [internalChecked, setInternalChecked] = useState(false);
	const isControlled = typeof checked === 'boolean';
	const isChecked = isControlled ? checked : internalChecked;

	const handleToggle = () => {
		const newValue = !isChecked;
		if (!isControlled) setInternalChecked(newValue);
		onChange(newValue);
	};

	return (
		<div
			onClick={handleToggle}
			className={cn('flex items-center gap-2 cursor-pointer select-none', className)}
		>
			<div className="text-primary transition-colors">
				{isChecked ? (
					<FiCheckSquare size={iconSize} />
				) : (
					<FiSquare size={iconSize} className="text-muted-foreground" />
				)}
			</div>
			{label && (
				<label htmlFor={name} className="text-sm text-foreground_1">
					{label}
				</label>
			)}
		</div>
	);
};

export default CustomCheckbox;
