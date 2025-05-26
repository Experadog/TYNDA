'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { Link, usePathname } from '@/i18n/routing';
import { DASHBOARD_LINKS } from '@/lib';
import { useUser } from '@/providers/user/user-provider';
import { UserRole } from '@business-entities';
import { Avatar, Button } from '@components';
import clsx from 'clsx';
import { Fragment, useCallback, useMemo } from 'react';
import { MdLogout } from 'react-icons/md';
import { useUpdateProfileUseCase } from '../../profile/update-profile/use-case/useUpdateProfileUseCase';

const Sidebar = () => {
	const { user } = useUser();
	const pathname = usePathname();
	const { breadCrumbs } = useViewModel(['Shared']);

	if (!user) return null;

	const {
		actions: { onLogout },
	} = useUpdateProfileUseCase();

	const shouldHighlightLink = useCallback(
		(path: string) => pathname.startsWith(path),
		[pathname],
	);

	const [role, roleKey] = useMemo((): [string, keyof typeof DASHBOARD_LINKS] => {
		const { is_superuser, role } = user;

		if (is_superuser) return ['Администратор', 'super_user'];

		if (role === UserRole.ESTABLISHER) return ['Владелец', UserRole.ESTABLISHER];

		return ['Сотрудник', UserRole.ESTABLISHER_WORKER];
	}, [user]);

	return (
		<div className="w-full h-full flex flex-col items-center gap-10">
			<div className="flex gap-3 w-full items-center">
				<Avatar
					className="rounded-full"
					src={user?.avatar || '/other/avatar-placeholder.webp'}
				/>
				<div className="flex flex-col gap-1">
					<p className="text-foreground_1 font-semibold">
						{user?.last_name} {user?.first_name}
					</p>

					<p className="text-gray text-xs font-normal">{user?.email}</p>
					<p className="text-gray text-xs">
						Роль: <strong className="text-orange font-mono">{role}</strong>
					</p>
				</div>
			</div>

			<div className="flex gap-2 w-full flex-col">
				<p className="font-semibold text-foreground_1">Меню</p>
				<div className="flex flex-col gap-3">
					{DASHBOARD_LINKS[roleKey].map(({ icon: Icon, link, key }, index) => (
						<Fragment key={link}>
							{index === DASHBOARD_LINKS[roleKey].length - 1 && (
								<div className="w-full h-[1px] bg-light_gray" />
							)}
							<Link
								key={link}
								className={clsx(
									'flex items-center gap-3 font-normal text-base transition-colors hover:bg-yellow hover:text-white px-3 py-2 rounded-2xl',
									shouldHighlightLink(link) ? 'bg-yellow text-white' : '',
								)}
								href={link}
							>
								<Icon className="size-5" />
								{breadCrumbs[key]}
							</Link>
						</Fragment>
					))}
				</div>
			</div>

			<Button
				onClick={onLogout}
				variant={'ghost'}
				className="flex items-center mr-auto mt-auto gap-2 w-max"
			>
				<MdLogout />
				Выйти
			</Button>
		</div>
	);
};

export default Sidebar;
