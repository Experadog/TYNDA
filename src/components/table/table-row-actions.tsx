import { Edit, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type Props = {
	onUpdate?: () => void;
	onDelete?: () => void;
};

const TableRowActions = ({ onDelete, onUpdate }: Props) => {
	return (
		<div className="flex items-center justify-end gap-1">
			{onDelete && (
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							disableAnimation
							onClick={onDelete}
							size={'icon'}
							className="rounded-full hover:bg-error hover:text-white text-foreground_1"
						>
							<Trash />
						</Button>
					</TooltipTrigger>
					<TooltipContent className="bg-background_1">
						<p className="text-foreground_1 font-semibold font-roboto">Удалить</p>
					</TooltipContent>
				</Tooltip>
			)}

			{onUpdate && (
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							onClick={onUpdate}
							disableAnimation
							size={'icon'}
							className="rounded-full hover:bg-orange hover:text-white text-foreground_1"
						>
							<Edit />
						</Button>
					</TooltipTrigger>

					<TooltipContent className="bg-background_1">
						<p className="text-foreground_1 font-semibold font-roboto">Редактировать</p>
					</TooltipContent>
				</Tooltip>
			)}
		</div>
	);
};

export default TableRowActions;
