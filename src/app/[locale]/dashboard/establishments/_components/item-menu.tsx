import { Link } from '@/i18n/routing';
import { PAGES } from '@/lib';
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@components';
import { Settings, Trash2, Users2 } from 'lucide-react';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';

const ItemMenu = ({
	label,
	itemID,
	isSuperUser,
	onDelete,
}: {
	label: string;
	itemID: string;
	isSuperUser: boolean;
	onDelete: (id: string) => void;
}) => {
	const [open, setOpen] = useState(false);

	const handleDelete = () => {
		onDelete(itemID);
		setOpen(false);
	};

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<Button
					size={'icon'}
					className="absolute rounded-full right-2 top-2 bg-background_1"
					disableAnimation
				>
					<BsThreeDotsVertical className="text-foreground_1" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="bg-background_6 border border-light_gray w-[200px]">
				<DropdownMenuLabel className="truncate">{label}</DropdownMenuLabel>
				<DropdownMenuSeparator className="bg-light_gray" />
				<DropdownMenuItem
					className="hover:bg-light_gray cursor-pointer font-semibold"
					asChild
				>
					<Link href={`${PAGES.ESTABLISHMENT}/${itemID}`}>
						<Settings />
						Редактировать
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem
					className="hover:bg-light_gray cursor-pointer font-semibold"
					asChild
					disabled={isSuperUser}
				>
					<Link href={`${PAGES.ESTABLISHMENT}/${itemID}/${PAGES.STAFF}`}>
						<Users2 />
						Сотрудники
					</Link>
				</DropdownMenuItem>

				<DropdownMenuItem
					className="hover:bg-light_gray cursor-pointer font-semibold"
					asChild
					disabled={isSuperUser}
				>
					<Link href={`${PAGES.ESTABLISHMENT}/${itemID}/${PAGES.CHAT}`}>
						<IoChatbubbleEllipsesOutline />
						Чат
					</Link>
				</DropdownMenuItem>

				<DropdownMenuSeparator className="bg-light_gray" />

				<DropdownMenuItem
					className="hover:bg-light_gray cursor-pointer font-semibold"
					onClick={handleDelete}
				>
					<Trash2 />
					Удалить
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ItemMenu;
