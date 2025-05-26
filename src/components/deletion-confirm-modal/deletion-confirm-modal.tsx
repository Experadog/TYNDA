import { AlertTriangle } from 'lucide-react';
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
			<DialogContent className="bg-background_1 p-8 rounded-2xl border-none w-full max-w-md shadow-xl">
				<DialogHeader className="flex flex-col items-center gap-3 text-center">
					<div className="bg-red-100 text-error rounded-full p-3">
						<AlertTriangle className="w-6 h-6" />
					</div>
					<DialogTitle className="text-2xl font-semibold font-roboto">
						Вы уверены?
					</DialogTitle>
				</DialogHeader>

				<p className="mt-2 mb-6 text-foreground_4 text-sm text-center font-roboto">
					{text ?? 'Это действие нельзя будет отменить. Продолжить удаление?'}
				</p>

				<DialogFooter className="flex flex-col sm:flex-row justify-end gap-3">
					<Button
						variant="outline"
						disableAnimation
						onClick={onClose}
						className="text-foreground_1 bg-background_1 border-light_gray"
					>
						Отмена
					</Button>
					<Button
						variant="default"
						disableAnimation
						onClick={onConfirm}
						className="bg-error text-white"
					>
						Удалить
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeletionConfirmModal;
