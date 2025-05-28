import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@components';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

const PermissionSettingsModal = ({ isOpen, onClose }: Props) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="bg-background_1 rounded-2xl font-roboto">
				<DialogHeader>
					<DialogTitle className="text-foreground_1 text-center text-xl ">
						Настроить разрешение
					</DialogTitle>
					<DialogDescription className="text-gray text-center">
						Вы можете удалить или редактировать разрешение
					</DialogDescription>
				</DialogHeader>

				<DialogFooter className="flex flex-row items-center justify-between w-full">
					<Button
						className="rounded-lg bg-error text-white"
						disableAnimation
						size={'sm'}
						onClick={onClose}
					>
						Удалить
					</Button>

					<div className="flex items-center gap-3">
						<Button
							className="rounded-lg"
							disableAnimation
							size={'sm'}
							onClick={onClose}
						>
							Закрыть
						</Button>

						<Button
							className="rounded-lg bg-orange text-white"
							disableAnimation
							size={'sm'}
						>
							Сохранить изменения
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default PermissionSettingsModal;
