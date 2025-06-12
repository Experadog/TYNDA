import usePreventAutoFocus from '@/common/hooks/usePreventAutoFocus';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '../ui/dialog';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
	onClick?: () => Promise<void>;
	action: 'create' | 'update';
	description?: string;
	buttonForm?: string;
	modal?: boolean;
	className?: string;
	disableSubmit?: boolean;
};

const DialogWrapper = ({
	isOpen,
	onClose,
	title,
	children,
	onClick,
	action,
	description,
	buttonForm,
	modal = true,
	className,
	disableSubmit = false,
}: Props) => {
	const prevent = usePreventAutoFocus();

	return (
		<Dialog open={isOpen} onOpenChange={onClose} modal={modal}>
			<DialogContent
				{...prevent}
				className={clsx(
					'bg-background_1 border-none p-8 sm:p-10 rounded-2xl xs:max-w-[90%]',
					className,
				)}
			>
				<DialogHeader className="space-y-2 text-center">
					<DialogTitle className="text-foreground_1 text-xl font-semibold">
						{title}
					</DialogTitle>
					{description && (
						<DialogDescription className="text-muted-foreground text-sm">
							{description}
						</DialogDescription>
					)}
				</DialogHeader>

				<div className="mt-6">{children}</div>

				<DialogFooter className="mt-8 flex flex-row justify-end gap-3">
					<Button
						variant="outline"
						className="rounded-xl px-5 py-2 text-sm border-shade_gray text-foreground_1"
						onClick={onClose}
						disableAnimation
					>
						Закрыть
					</Button>
					<Button
						type="submit"
						form={buttonForm}
						disableAnimation
						onClick={onClick}
						disabled={disableSubmit}
						className="bg-yellow text-white rounded-xl px-5 py-2 text-sm font-medium"
					>
						{action === 'create' ? 'Создать' : 'Сохранить'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DialogWrapper;
