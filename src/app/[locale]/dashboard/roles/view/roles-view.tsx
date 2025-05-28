'use client';

import { useViewModel } from '@/i18n/getTranslate';
import RolesHeaderBlock from '../_components/header-block';
import RoleList from '../_components/list/role-list';

const RolesView = () => {
	const viewModel = useViewModel(['Shared']);

	return (
		<div className="flex flex-col gap-3">
			<RolesHeaderBlock>
				<p className="text-lg">Выберите роль</p>
			</RolesHeaderBlock>
			<RoleList />
		</div>
	);
};

export default RolesView;
