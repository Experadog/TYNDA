import type { PermissionScopeKey } from '@business-entities';
import SelectedRoleView from './view/selected-role-view';

type Params = Promise<{
	role_id: PermissionScopeKey;
}>;

const Page = async ({ params }: { params: Params }) => {
	const { role_id } = await params;

	return <SelectedRoleView role_id={role_id} />;
};

export default Page;
