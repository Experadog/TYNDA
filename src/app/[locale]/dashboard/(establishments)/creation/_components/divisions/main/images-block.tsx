import { useDashboardUseCases } from '@/app/[locale]/dashboard/use-case/dashboard-useCases-provider';
import type { TargetRow } from '../../../../use-case/useImageUploadingUseCase';
import ImageBlockItem from '../../ui/image-block-item';

const ImagesBlock = () => {
	const {
		useCases: {
			establishment: { sharedUseCases },
		},
	} = useDashboardUseCases();

	const {
		imageUploadUseCase: { actions, refs, states },
	} = sharedUseCases;

	const { onChangeImages, onCoverChange, onDelete, onEditChange, onEditTarget, onDeleteCover } =
		actions;
	const { bottomInputRef, editInputRef, topInputRef, coverInputRef } = refs;
	const { bottomRowFiles, coverFile, topRowFiles } = states;

	const renderRow = (
		files: File[],
		row: TargetRow,
		inputRef: React.RefObject<HTMLInputElement | null>,
	) => (
		<div className="flex gap-4 flex-nowrap h-1/2">
			{files.map((file, idx) => (
				<ImageBlockItem
					key={`${file.name}-${idx}`}
					image={URL.createObjectURL(file)}
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
						image={coverFile ? URL.createObjectURL(coverFile) : null}
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
