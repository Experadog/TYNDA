'use client';

import clsx from 'clsx';
import { UploadCloud, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Props = {
	onChange: (file: File | null) => void;
	defaultValue?: string;
	label?: string;
	className?: string;
	circle?: boolean;
	size?: 'sm' | 'md' | 'lg';
};

const sizeMap = {
	sm: 'w-24 h-24',
	md: 'w-40 h-40',
	lg: 'w-60 h-60',
};

const ImgUploader = ({
	onChange,
	defaultValue,
	label = 'Upload Image',
	className = '',
	circle = false,
	size = 'md',
}: Props) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [preview, setPreview] = useState<string | null>(defaultValue ?? null);

	useEffect(() => {
		setPreview(defaultValue ?? null);
	}, [defaultValue]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setPreview(URL.createObjectURL(file));
			onChange(file);
		}
	};

	const clearImage = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		onChange(null);

		setPreview(null);
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	};

	return (
		<div className={clsx('mx-auto', className)}>
			<label
				htmlFor={'img-upload'}
				className={clsx(
					'relative border border-dashed border-muted-foreground hover:border-yellow transition cursor-pointer bg-muted overflow-hidden flex items-center justify-center text-muted-foreground group p-1',
					sizeMap[size],
					circle ? 'rounded-full' : 'rounded-2xl',
				)}
			>
				{preview ? (
					<>
						<img
							src={preview}
							alt="Preview"
							className={clsx(
								'object-cover w-full h-full transition-opacity',
								circle ? 'rounded-full' : 'rounded-xl',
								'border border-muted',
							)}
						/>
						<div
							className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
							onClick={(e) => e.preventDefault()}
						>
							<button
								type="button"
								className="bg-background_2 text-red-500 rounded-full p-2 shadow-lg hover:bg-red-100 transition-colors"
								onClick={clearImage}
							>
								<X size={20} />
							</button>
						</div>
					</>
				) : (
					<div className="flex flex-col items-center text-center gap-1 bg-background_1">
						<UploadCloud className="w-6 h-6 text-yellow" />
						<p className="text-xs">{label}</p>
					</div>
				)}
			</label>
			<input
				ref={inputRef}
				type="file"
				id={'img-upload'}
				accept="image/*"
				onChange={handleFileChange}
				className="hidden"
			/>
		</div>
	);
};

export default ImgUploader;
