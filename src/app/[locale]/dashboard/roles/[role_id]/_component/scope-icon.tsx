import type { PermissionScopeKey } from '@business-entities';
import { Building2, ShieldCheck } from 'lucide-react';
import type { JSX } from 'react';
import { PiUsers } from 'react-icons/pi';

const ScopeIcon = ({ scope }: { scope: PermissionScopeKey }) => {
	const ICONS: Record<PermissionScopeKey, JSX.Element> = {
		user: <PiUsers className="w-6 h-6 group-hover:text-orange" />,
		establishment: <Building2 className="w-6 h-6 group-hover:text-orange" />,
		permission: <ShieldCheck className="w-6 h-6 group-hover:text-orange" />,
	};

	return <div className="flex-shrink-0 ">{ICONS[scope]}</div>;
};

export default ScopeIcon;
