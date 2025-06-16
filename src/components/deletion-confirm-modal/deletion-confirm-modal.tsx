import { AlertTriangle } from 'lucide-react';
import DialogWrapper from '../dialog-wrapper/dialog-wrapper';
import { Button } from '../ui/button';
import { DialogFooter } from '../ui/dialog';

type Props = {
	open: boolean;
	onClose: () => void;
	onConfirm: () => Promise<void>;
	text?: string;
};

const DeletionConfirmModal = ({ onClose, open, onConfirm, text }: Props) => {
	return (
		<DialogWrapper
			action="default"
			isOpen={open}
			onClose={onClose}
			title={
				<div className="flex flex-col">
					<div className="bg-red-100 text-error rounded-full p-3 w-max mx-auto my-4">
						<AlertTriangle className="w-8 h-8" />
					</div>
					<p>Внимание!</p>
				</div>
			}
			description={text || 'Это действие нельзя будет отменить. Продолжить удаление?'}
		>
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
		</DialogWrapper>
	);
};

export default DeletionConfirmModal;
