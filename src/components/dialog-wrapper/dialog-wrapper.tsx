import usePreventAutoFocus from '@/common/hooks/usePreventAutoFocus';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Button } from '../ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../ui/dialog';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	title: string | ReactNode;
	children: ReactNode;
	onClick?: () => Promise<void>;
	action: 'create' | 'update' | 'default';
	description?: string | ReactNode;
	buttonForm?: string;
	modal?: boolean;
	className?: string;
	disableSubmit?: boolean;
	direction?: 'vertical' | 'horizontal';
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
	direction = 'horizontal',
}: Props) => {
	const prevent = usePreventAutoFocus();

	return (
		<Dialog open={isOpen} onOpenChange={onClose} modal={modal}>
			<DialogContent
				{...prevent}
				autoFocus={false}
				className={clsx(
					'bg-background_1 !border-none p-8 sm:p-10 rounded-2xl xs:max-w-[90%] focus:border-none',
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

				<div className="mt-4">{children}</div>

				{action !== 'default' ? (
					<DialogFooter
						className={clsx(
							'mt-8 flex  justify-end gap-3',
							direction === 'horizontal' ? 'flex-row' : 'flex-col',
						)}
					>
						<Button
							variant="outline"
							className="rounded-xl px-5 py-3 text-sm border-shade_gray text-foreground_1"
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
							className="bg-yellow text-white rounded-xl px-5 py-3 text-sm font-medium"
						>
							{action === 'create' ? 'Создать' : 'Сохранить'}
						</Button>
					</DialogFooter>
				) : null}
			</DialogContent>
		</Dialog>
	);
};

export default DialogWrapper;
