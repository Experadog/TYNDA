import { type ChangeEvent, type RefObject, useRef, useState } from 'react';

export function useImageUploadingUseCase(): Exposes {
	const [coverFile, setCoverFile] = useState<File | null>(null);
	const [topRowFiles, setTopRowFiles] = useState<File[]>([]);
	const [bottomRowFiles, setBottomRowFiles] = useState<File[]>([]);
	const [editTarget, setEditTarget] = useState<EditTarget | null>(null);

	const coverInputRef = useRef<HTMLInputElement>(null);
	const topInputRef = useRef<HTMLInputElement>(null);
	const bottomInputRef = useRef<HTMLInputElement>(null);
	const editInputRef = useRef<HTMLInputElement>(null);

	const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) setCoverFile(file);
		e.target.value = '';
	};

	const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>, row: TargetRow) => {
		if (!e.target.files) return;
		const newFiles = Array.from(e.target.files);

		if (row === 'top') setTopRowFiles((prev) => [...prev, ...newFiles]);
		else setBottomRowFiles((prev) => [...prev, ...newFiles]);
		e.target.value = '';
	};

	const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file || !editTarget) return;

		const { row, index } = editTarget;

		if (row === 'top') {
			setTopRowFiles((prev) => prev.map((f, i) => (i === index ? file : f)));
		} else {
			setBottomRowFiles((prev) => prev.map((f, i) => (i === index ? file : f)));
		}

		setEditTarget(null);
		e.target.value = '';
	};

	const handleDelete = (index: number, row: TargetRow) => {
		if (row === 'top') {
			setTopRowFiles((prev) => prev.filter((_, i) => i !== index));
		} else {
			setBottomRowFiles((prev) => prev.filter((_, i) => i !== index));
		}
	};

	const onDeleteCover = () => {
		setCoverFile(null);
	};

	const handleEdit = (index: number, row: TargetRow) => {
		setEditTarget({ index, row });
		editInputRef.current?.click();
	};

	return {
		states: { bottomRowFiles, coverFile, topRowFiles },
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
		coverFile: File | null;
		topRowFiles: File[];
		bottomRowFiles: File[];
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
