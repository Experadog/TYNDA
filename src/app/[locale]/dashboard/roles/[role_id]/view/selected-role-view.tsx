'use client';
import { useViewModel } from '@/i18n/getTranslate';
import RolesHeaderBlock from '../../_components/header-block';
import ScopeList from '../_component/list/scope-list';

const SelectedRoleView = ({ role_id }: { role_id: string }) => {
	const viewModel = useViewModel(['Shared']);

	return (
		<div className="flex flex-col gap-3">
			<RolesHeaderBlock>
				<p className="text-lg">Выберите область</p>
			</RolesHeaderBlock>
			<ScopeList scopeViewModel={viewModel.permission_scopes} role_id={role_id} />
		</div>
	);
};

export default SelectedRoleView;
