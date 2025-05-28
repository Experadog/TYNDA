'use client';

import {
	Button,
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@components';
import { useRef, useState } from 'react';
import { PiDownloadSimpleLight } from 'react-icons/pi';
import { useProfileSettingsUseCase } from '../../../use-case/profile-use-case';

const AvatarUpdating = () => {
	const {
		states: { isAvatarUpdating },
		actions: { closeAvatarUpdating, onUpdateAvatar },
	} = useProfileSettingsUseCase();

	const fileInputRef = useRef<HTMLInputElement>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [file, setFile] = useState<File | null>(null);

	const handleFileClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selected = e.target.files?.[0];
		if (!selected) return;
		setFile(selected);
		const previewURL = URL.createObjectURL(selected);

		setPreview(previewURL);
	};
	const handleSave = () => {
		if (!file) return;

		const formData = new FormData();
		formData.append('files', file);

		onUpdateAvatar(formData);

		closeAvatarUpdating();
		setPreview(null);
		setFile(null);
	};

	return (
		<Dialog open={isAvatarUpdating} onOpenChange={closeAvatarUpdating}>
			<DialogContent className="bg-background_1 p-8 rounded-2xl border-none w-full max-w-md">
				<DialogHeader>
					<DialogTitle className="text-2xl font-semibold text-center">
						Выберите изображение для профиля
					</DialogTitle>
				</DialogHeader>

				<div className="flex flex-col items-center gap-4 mt-6">
					<button
						type="button"
						onClick={handleFileClick}
						className="relative flex items-center justify-center w-40 h-40 border-2 border-dashed border-yellow rounded-full hover:bg-yellow/10 transition overflow-hidden"
					>
						{preview ? (
							<img
								src={preview}
								alt="Avatar preview"
								className="w-full h-full object-cover rounded-full"
							/>
						) : (
							<div className="flex flex-col items-center">
								<PiDownloadSimpleLight size={48} className="text-yellow" />
								<span className="mt-2 text-sm text-foreground_1 text-center">
									Нажмите, чтобы выбрать
								</span>
							</div>
						)}
					</button>

					<input
						type="file"
						accept="image/webp, image/png, image/jpeg"
						className="hidden"
						ref={fileInputRef}
						onChange={handleFileChange}
					/>
				</div>

				<DialogFooter className="flex flex-col justify-between mt-8 gap-3">
					<Button variant="default" onClick={closeAvatarUpdating}>
						Отмена
					</Button>
					<Button variant={'yellow'} onClick={handleSave} disabled={!file}>
						Сохранить
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AvatarUpdating;
