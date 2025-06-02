'use server';

import type { FC, ReactNode } from 'react';
import { UpdateProfileProvider } from '../profile/update-profile/use-case/useUpdateProfileUseCase';
import DashboardBreadcrumbs from './_components/dashboard-breadcrumbs';
import Sidebar from './_components/sidebar';
import { ChatContextProvider } from './chat/context/chat-context-provider';
import { EstablishmentContextProvider } from './establishments/use-case/establishment-context-provider';
import { getSettings } from './page-settings-actions';
import { executeDefaultRoleRequests } from './request-actions';
import { RolesContextProvider } from './roles/context/roles-context-provider';
import { SettingsContextProvider } from './settings/context/settings-context-provider';
import { UsersContextProvider } from './users/context/users-context-provider';

interface IProps {
	children: ReactNode;
}

const DashboardLayout: FC<IProps> = async ({ children }) => {
	const { establishmentsResponse, rolesResponse, usersResponse, chatResponse } =
		await executeDefaultRoleRequests();

	const settings = await getSettings();

	return (
		<ChatContextProvider chatResponse={chatResponse}>
			<SettingsContextProvider settings={settings}>
				<UsersContextProvider usersResponse={usersResponse}>
					<RolesContextProvider roles={rolesResponse}>
						<EstablishmentContextProvider establishments={establishmentsResponse}>
							<UpdateProfileProvider>
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
							</UpdateProfileProvider>
						</EstablishmentContextProvider>
					</RolesContextProvider>
				</UsersContextProvider>
			</SettingsContextProvider>
		</ChatContextProvider>
	);
};

export default DashboardLayout;
