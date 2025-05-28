'use client';

import { Link } from '@/i18n/routing';
import { PAGES, getTranslateByKey } from '@/lib';
import { cn } from '@/lib/utils'; // если есть утилита classnames
import { useLocale } from '@/providers/locale/locale-provider';
import type { Role } from '@business-entities';
import { ShieldCheck, UserCog, Users } from 'lucide-react';
import type { JSX } from 'react';

const iconMap: Record<string, JSX.Element> = {
	Клиент: <Users className="h-6 w-6 text-primary" />,
	Предприниматель: <UserCog className="h-6 w-6 text-primary" />,
	'Сотрудник предприятия': <ShieldCheck className="h-6 w-6 text-primary" />,
};

const RoleItem = ({ status, translates, id }: Role) => {
	const { locale } = useLocale();

	const name = getTranslateByKey(locale, translates, 'name');
	const description = getTranslateByKey(locale, translates, 'description');

	const href = `${PAGES.ROLES}/${id}`;

	return (
		<Link
			href={href}
			className={cn(
				'bg-background_1 rounded-xl p-4 border border-light_gray  hover:bg-input_bg group',
				status !== 'enable' && 'opacity-50 pointer-events-none',
			)}
		>
			<div className="flex items-start gap-3 group-hover:text-orange">
				<div className="shrink-0">
					{iconMap[name] ?? <ShieldCheck className="h-6 w-6 text-foreground_1" />}
				</div>
				<div>
					<h3 className="text-lg font-semibold mb-1 text-foreground_1 group-hover:text-orange">
						{name}
					</h3>
					<p className="text-sm  text-gray ">{description}</p>
				</div>
			</div>
		</Link>
	);
};

export default RoleItem;
