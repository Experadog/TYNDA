import type { EstablishmentSchema } from '@common';
import { type ChangeEvent, type RefObject, useEffect, useRef, useState } from 'react';
import { useWatch } from 'react-hook-form';

type Props = {
	schema: EstablishmentSchema;
};

export function useImageUploadingUseCase({ schema }: Props): Exposes {
	const images =
		useWatch({
			control: schema.control,
			name: 'images',
		}) || [];

	const cover =
		useWatch({
			control: schema.control,
			name: 'cover',
		}) || null;

	const [coverFile, setCoverFile] = useState<File | string | null>(null);
	const [topRowFiles, setTopRowFiles] = useState<Array<File | string>>([]);
	const [bottomRowFiles, setBottomRowFiles] = useState<Array<File | string>>([]);

	const [editTarget, setEditTarget] = useState<EditTarget | null>(null);

	const coverInputRef = useRef<HTMLInputElement>(null);
	const topInputRef = useRef<HTMLInputElement>(null);
	const bottomInputRef = useRef<HTMLInputElement>(null);
	const editInputRef = useRef<HTMLInputElement>(null);

	const setCoverImageSchema = (value: File | undefined) => {
		schema.setValue('cover', value, { shouldDirty: true });
		schema.trigger('cover');
	};

	const setImagesSchema = (value: Array<File | string>) => {
		schema.setValue('images', value, { shouldDirty: true });
		schema.trigger('images');
	};

	const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setCoverFile(file);
			setCoverImageSchema(file);
		}
		e.target.value = '';
	};

	const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>, row: TargetRow) => {
		if (!e.target.files) return;
		const newFiles = Array.from(e.target.files);

		if (row === 'top') {
			setTopRowFiles((prev) => {
				const updated = [...prev, ...newFiles];
				return updated;
			});
		} else {
			setBottomRowFiles((prev) => {
				const updated = [...prev, ...newFiles];
				return updated;
			});
		}

		setImagesSchema([...images, ...newFiles]);

		e.target.value = '';
	};

	const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file || !editTarget) return;

		const { row, index } = editTarget;

		let newTop = topRowFiles;
		let newBottom = bottomRowFiles;

		if (row === 'top') {
			newTop = topRowFiles.map((f, i) => (i === index ? file : f));
			setTopRowFiles(newTop);
		} else {
			newBottom = bottomRowFiles.map((f, i) => (i === index ? file : f));
			setBottomRowFiles(newBottom);
		}

		setImagesSchema([...newTop, ...newBottom]);

		setEditTarget(null);
		e.target.value = '';
	};

	const handleDelete = (index: number, row: TargetRow) => {
		let newTop = topRowFiles;
		let newBottom = bottomRowFiles;

		if (row === 'top') {
			newTop = topRowFiles.filter((_, i) => i !== index);
			setTopRowFiles(newTop);
		} else {
			newBottom = bottomRowFiles.filter((_, i) => i !== index);
			setBottomRowFiles(newBottom);
		}

		setImagesSchema([...newTop, ...newBottom]);
	};

	const onDeleteCover = () => {
		setCoverFile(null);
		setCoverImageSchema(undefined);
	};

	const handleEdit = (index: number, row: TargetRow) => {
		setEditTarget({ index, row });
		editInputRef.current?.click();
	};

	const errors = schema.formState.errors;
	const coverError = errors.cover?.message;
	const imagesError = errors.images?.message;

	const fieldErrors = [coverError, imagesError];

	useEffect(() => {
		const mid = Math.ceil(images.length / 2);
		setCoverFile(cover);
		setTopRowFiles(images.slice(0, mid));
		setBottomRowFiles(images.slice(mid));
	}, [cover, images]);

	return {
		states: { bottomRowFiles, coverFile, topRowFiles, fieldErrors },
		refs: { bottomInputRef, coverInputRef, editInputRef, topInputRef },
		actions: {
			onChangeImages: handleImagesChange,
			onCoverChange: handleCoverChange,
			onDelete: handleDelete,
			onEditTarget: handleEdit,
			onEditChange: handleEditChange,
			onDeleteCover,
		},
	};
}

type Exposes = {
	refs: {
		coverInputRef: RefObject<HTMLInputElement | null>;
		topInputRef: RefObject<HTMLInputElement | null>;
		bottomInputRef: RefObject<HTMLInputElement | null>;
		editInputRef: RefObject<HTMLInputElement | null>;
	};

	states: {
		coverFile: File | null | string;
		topRowFiles: Array<string | File>;
		bottomRowFiles: Array<string | File>;
		fieldErrors: Array<undefined | string>;
	};

	actions: {
		onCoverChange: (e: ChangeEvent<HTMLInputElement>) => void;
		onChangeImages: (e: ChangeEvent<HTMLInputElement>, row: TargetRow) => void;
		onEditTarget: (index: number, row: TargetRow) => void;
		onDelete: (index: number, row: TargetRow) => void;
		onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
		onDeleteCover: () => void;
	};
};

export type TargetRow = 'top' | 'bottom';

interface EditTarget {
	index: number;
	row: TargetRow;
}
