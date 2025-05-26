'use client';

import { useViewModel } from '@/i18n/getTranslate';
import type { GetDetailedRolesResponseModel } from '@/services/roles/roleServiceTypes';
import type { PermissionScopeKey } from '@business-entities';
import { useMemo } from 'react';
import EmptyView from '../../../_components/empty-view';
import RolesHeaderBlock from '../../../_components/header-block';
import ScopeIcon from '../../_component/scope-icon';
import PermissionList from '../_components/list/permission-list';

type Props = {
	data: GetDetailedRolesResponseModel['data'];
	scope: PermissionScopeKey;
};

const PermissionsView = ({ data, scope }: Props) => {
	const viewModel = useViewModel(['Shared']);

	const filteredPermissions = useMemo(() => {
		return data.permissions.filter((item) => item.scope === scope);
	}, [data.permissions, scope]);

	return (
		<div className="flex flex-col gap-3 h-full">
			<RolesHeaderBlock>
				<div className="flex items-center gap-2">
					<ScopeIcon scope={scope} />
					<p className="text-foreground_1 font-semibold text-xl">
						{viewModel.permission_scopes[scope].label}
					</p>
				</div>
			</RolesHeaderBlock>

			{filteredPermissions.length ? (
				<PermissionList list={filteredPermissions} />
			) : (
				<EmptyView />
			)}
		</div>
	);
};

export default PermissionsView;
