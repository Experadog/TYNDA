import type { EstablishmentSchema } from '@common';
import {
	type TargetRow,
	useImageUploadingUseCase,
} from '../../../../use-case/other/useImageUploadingUseCase';
import ImageBlockItem from '../ui/image-block-item';

type Props = {
	schema: EstablishmentSchema;
};

const ImagesBlock = ({ schema }: Props) => {
	const imageUploadUseCase = useImageUploadingUseCase({ schema });

	const { actions, refs, states } = imageUploadUseCase;

	const { onChangeImages, onCoverChange, onDelete, onEditChange, onEditTarget, onDeleteCover } =
		actions;
	const { bottomInputRef, editInputRef, topInputRef, coverInputRef } = refs;
	const { bottomRowFiles, coverFile, topRowFiles, fieldErrors } = states;

	const renderRow = (
		files: Array<File | string>,
		row: TargetRow,
		inputRef: React.RefObject<HTMLInputElement | null>,
	) => (
		<div className="flex gap-4 flex-nowrap h-1/2">
			{files.map((file, idx) => (
				<ImageBlockItem
					key={`${file instanceof File ? file.name : file}-${idx}`}
					image={file}
					onDelete={() => onDelete(idx, row)}
					onEdit={() => onEditTarget(idx, row)}
				/>
			))}
			<div className="h-full" onClick={() => inputRef?.current?.click()}>
				<ImageBlockItem />
			</div>
		</div>
	);

	return (
		<div className="flex flex-col gap-3 font-roboto h-[450px]">
			<p className="text-foreground_1">Фото предприятия</p>
			<div className="flex gap-4 h-full">
				<div
					onClick={() => !coverFile && coverInputRef?.current?.click()}
					className="h-full"
				>
					<ImageBlockItem
						isCover
						image={coverFile}
						onDelete={onDeleteCover}
						onEdit={() => coverInputRef?.current?.click()}
					/>
					<input
						ref={coverInputRef}
						type="file"
						accept="image/*"
						className="hidden"
						onChange={onCoverChange}
					/>
				</div>

				<div className="overflow-x-auto w-full flex flex-col gap-4">
					{renderRow(topRowFiles, 'top', topInputRef)}
					{renderRow(bottomRowFiles, 'bottom', bottomInputRef)}
				</div>
			</div>

			<div className="flex flex-col gap-2">
				{fieldErrors.map(
					(error) =>
						error && (
							<span
								key={error}
								className="text-error font-semibold text-sm numeric font-roboto text-end"
							>
								{error}
							</span>
						),
				)}
			</div>

			<input
				ref={topInputRef}
				type="file"
				accept="image/*"
				multiple
				className="hidden"
				onChange={(e) => onChangeImages(e, 'top')}
			/>
			<input
				ref={bottomInputRef}
				type="file"
				accept="image/*"
				multiple
				className="hidden"
				onChange={(e) => onChangeImages(e, 'bottom')}
			/>
			<input
				ref={editInputRef}
				type="file"
				accept="image/*"
				className="hidden"
				onChange={onEditChange}
			/>
		</div>
	);
};

export default ImagesBlock;
