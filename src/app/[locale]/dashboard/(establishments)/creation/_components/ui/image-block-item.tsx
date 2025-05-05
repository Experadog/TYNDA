import clsx from 'clsx';
import Image from 'next/image';
import type { MouseEvent } from 'react';
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';

interface Props {
	isCover?: boolean;
	image?: string | null;
	onEdit?: () => void;
	onDelete?: () => void;
}

const ImageBlockItem = ({ isCover = false, image = null, onEdit, onDelete }: Props) => {
	const handleOnEdit = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		if (onEdit) {
			onEdit();
		}
	};

	const handleOnDelete = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();

		if (onDelete) {
			onDelete();
		}
	};

	return (
		<div
			className={clsx(
				'group flex-shrink-0 h-full rounded-xl relative flex items-center justify-center border-[0.5px] border-shade_gray overflow-hidden',
				isCover ? 'w-[400px]' : 'w-[300px]',
				image
					? 'bg-background_2 cursor-default'
					: 'bg-background_2 hover:bg-background_3 hover:scale-95 cursor-pointer transition-transform duration-200',
			)}
		>
			{image ? (
				<>
					<Image src={image} alt="preview" fill className="object-cover" />

					<div className="absolute top-2 right-2 flex gap-2">
						<button
							type="button"
							onClick={handleOnEdit}
							className="bg-yellow p-2 rounded-xl"
						>
							<AiOutlineEdit className="text-white text-lg" />
						</button>
						<button
							type="button"
							onClick={handleOnDelete}
							className="bg-yellow p-2 rounded-xl"
						>
							<AiOutlineDelete className="text-white text-lg" />
						</button>
					</div>
				</>
			) : (
				<AiOutlinePlus
					className={clsx(
						'text-2xl transition-colors',
						image ? 'text-shade_gray' : 'text-shade_gray group-hover:text-foreground_3',
					)}
				/>
			)}
		</div>
	);
};

export default ImageBlockItem;
