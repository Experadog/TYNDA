import { Link } from '@/i18n/routing';
import { PAGES } from '@/lib';
import type { PermissionScopeKey } from '@business-entities';
import ScopeIcon from '../scope-icon';

type Props = {
	value: PermissionScopeKey;
	label: string;
	description: string;
	role_id: string;
};

const ScopeListItem = ({ value, label, description, role_id }: Props) => {
	return (
		<Link
			href={`${PAGES.ROLES}/${role_id}/${value}`}
			className="block w-full max-w-md shadow-sm hover:shadow-md transition-shadow bg-background_1  border group border-light_gray p-5 rounded-2xl"
		>
			<div className="flex items-center gap-3 mb-3 group-hover:text-orange">
				<ScopeIcon scope={value} />
				<h3 className="text-lg font-semibold">{label}</h3>
			</div>
			<p className="text-sm text-gray leading-relaxed">{description}</p>
		</Link>
	);
};

export default ScopeListItem;
