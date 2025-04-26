import { Link, usePathname } from '@/i18n/routing';
import { DASHBOARD_LINKS } from '@/lib';
import type { User } from '@business-entities';
import { Avatar, Button } from '@components';
import clsx from 'clsx';
import { type FC, Fragment, useMemo } from 'react';
import { CiDiscount1, CiShop } from 'react-icons/ci';
import { HiOutlineChatAlt } from 'react-icons/hi';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
import { useUpdateProfileUseCase } from '../../profile/update-profile/use-case/useUpdateProfileUseCase';

interface IProps {
	user: User;
}

const Sidebar: FC<IProps> = ({ user }) => {
	const pathname = usePathname();

	const {
		actions: { onLogout },
	} = useUpdateProfileUseCase();

	const icons = [
		<CiShop key={'1'} />,
		<HiOutlineChatAlt key={'2'} />,
		<CiDiscount1 key={'3'} />,
		<IoSettingsOutline key={'4'} />,
	];
	const labels = ['Предприятия', 'Взаимодействие', 'Скидки и акции', 'Настройки'];

	const shouldHighlightLink = useMemo(() => (path: string) => path === pathname, [pathname]);

	return (
		<div className="w-full flex flex-col items-center gap-10">
			<div className="flex gap-3 w-full items-center">
				<Avatar
					className="rounded-full"
					src={user.avatar || '/other/avatar-placeholder.webp'}
				/>
				<div className="flex flex-col gap-1">
					<p className="text-foreground_1 font-semibold">
						{user.last_name} {user.first_name}
					</p>

					<p className="text-gray text-xs font-normal">{user.email}</p>
				</div>
			</div>

			<div className="flex gap-2 w-full flex-col">
				<p className="font-semibold text-foreground_1">Меню</p>
				<div className="flex flex-col gap-3">
					{DASHBOARD_LINKS.map((link, index) => (
						<Fragment key={link}>
							{index === DASHBOARD_LINKS.length - 1 && (
								<div className="w-full h-[1px] bg-light_gray" />
							)}
							<Link
								key={link}
								className={clsx(
									'flex items-center gap-3 font-semibold text-base transition-colors hover:bg-yellow hover:text-white px-3 py-2 rounded-2xl',
									shouldHighlightLink(link) ? 'bg-yellow text-white' : '',
								)}
								href={link}
							>
								{icons[index]}
								{labels[index]}
							</Link>
						</Fragment>
					))}
				</div>
			</div>

			<Button
				onClick={onLogout}
				variant={'ghost'}
				className="flex items-center mr-auto mt-[100%] gap-2 w-max"
			>
				<MdLogout />
				Выйти
			</Button>
		</div>
	);
};

export default Sidebar;
