import type { ReactNode } from 'react';
import DashboardBreadcrumbs from './_components/dashboard-breadcrumbs';
import Sidebar from './_components/sidebar';
import RoleBasedLayout from './_role-based/role-based-layout';

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<RoleBasedLayout>
			<div className="flex h-screen font-roboto">
				<div className="flex-[1] bg-background_6 p-6 border-r border-r-light_gray overflow-y-auto">
					<Sidebar />
				</div>
				<div className="flex-[5] flex flex-col bg-background_2 min-w-0">
					<div className="shrink-0 border-b border-b-light_gray bg-background_6 p-6">
						<DashboardBreadcrumbs />
					</div>
					<div className="flex-1 overflow-y-auto p-6">{children}</div>
				</div>
			</div>
		</RoleBasedLayout>
	);
}
