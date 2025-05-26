'use client';

import { PERMISSION_SCOPES } from '@business-entities';
import ScopeListItem from './scope-item';

type Props = {
	scopeViewModel: ViewModel['Shared']['permission_scopes'];
	role_id: string;
};

const ScopeList = ({ scopeViewModel, role_id }: Props) => {
	return (
		<div className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))]">
			{Object.values(PERMISSION_SCOPES).map((value) => (
				<ScopeListItem
					value={value}
					key={value}
					label={scopeViewModel[value].label}
					description={scopeViewModel[value].description}
					role_id={role_id}
				/>
			))}
		</div>
	);
};

export default ScopeList;
