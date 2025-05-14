import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';

type Props = {
	open: boolean;
	onClose: () => void;
	onConfirm: () => Promise<void>;
	text?: string;
};

const DeletionConfirmModal = ({ onClose, open, onConfirm, text }: Props) => {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="bg-background_1 p-8 rounded-2xl border-none w-full max-w-md">
				<DialogHeader>
					<DialogTitle className="text-2xl font-normal text-center font-roboto">
						Подтвердите удаление
					</DialogTitle>
				</DialogHeader>

				<p className="my-6 text-foreground_4 font-roboto font-normal text-base text-center">
					{text}
				</p>

				<DialogFooter className="flex flex-row justify-end gap-3">
					<Button
						variant="default"
						disableAnimation
						onClick={onClose}
						className="bg-yellow w-full font-roboto text-white"
					>
						Отмена
					</Button>
					<Button
						variant={'default'}
						disableAnimation
						onClick={onConfirm}
						className="bg-error w-full font-roboto text-white"
					>
						Подтвердить
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeletionConfirmModal;
