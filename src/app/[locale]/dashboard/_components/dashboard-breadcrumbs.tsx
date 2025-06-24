'use client';

import { useUser } from '@/providers/user/user-provider';
import { UserRole } from '@business-entities';
import AdminBreadCrumbs from './by-role/admin-breadCrumbs';
import EstablisherBreadCrumbs from './by-role/establisher-breadCrumbs';
import EstablishmentWorkerBreadCrumbs from './by-role/establishment-worker-breadCrumbs';

const DashboardBreadcrumbs = () => {
	const { user } = useUser();

	if (user?.is_superuser) return <AdminBreadCrumbs />;
	if (user?.role === UserRole.ESTABLISHMENT_WORKER) return <EstablishmentWorkerBreadCrumbs />;
	if (user?.role === UserRole.ESTABLISHER) return <EstablisherBreadCrumbs />;

	return null;
};

export default DashboardBreadcrumbs;
