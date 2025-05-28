import { getDetailedRole } from '@/services';
import type { PermissionScopeKey } from '@business-entities';
import PermissionsView from './view/permissions-view';

type Params = Promise<{
	role_id: string;
	scope: PermissionScopeKey;
}>;

const Page = async ({ params }: { params: Params }) => {
	const { role_id, scope } = await params;
	const response = await getDetailedRole(role_id);

	return <PermissionsView data={response.data} scope={scope} />;
};

export default Page;
