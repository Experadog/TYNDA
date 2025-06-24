import type { ReactNode } from 'react';

import type {
	EstablisherData,
	EstablishmentWorkerData,
	PageSettings,
	SuperUserData,
} from '@common';
import { CardContextProvider } from '../card/context/card-context-provider';
import { ChatContextProvider } from '../chat/context/chat-context-provider';
import { EstablishmentContextProvider } from '../establishments/use-case/establishment-context-provider';
import { RolesContextProvider } from '../roles/context/roles-context-provider';
import { SettingsContextProvider } from '../settings/context/settings-context-provider';
import { TariffContextProvider } from '../tariff/context/tariff-context-provider';
import { UsersContextProvider } from '../users/context/users-context-provider';

type ProviderProps<T> = {
	data: T;
	children: ReactNode;
};

type CommonProviderData = {
	settingsData: PageSettings;
};

function CommonProviders({ data, children }: { data: CommonProviderData; children: ReactNode }) {
	return (
		<SettingsContextProvider settings={data.settingsData}>{children}</SettingsContextProvider>
	);
}

export const roleContextMap = {
	superadmin: ({ data, children }: ProviderProps<SuperUserData>) => (
		<ChatContextProvider chatResponse={data.chatResponse}>
			<CardContextProvider cardResponse={data.cardResponse?.data}>
				<TariffContextProvider tariffsResponse={data.tariffResponse?.data}>
					<CommonProviders data={data}>
						<EstablishmentContextProvider establishments={data.establishmentsResponse}>
							<UsersContextProvider
								allUsersResponse={data.allUsersResponse}
								establisherOnlyResponse={data.establisherOnlyResponse}
							>
								<RolesContextProvider roles={data.rolesResponse}>
									{children}
								</RolesContextProvider>
							</UsersContextProvider>
						</EstablishmentContextProvider>
					</CommonProviders>
				</TariffContextProvider>
			</CardContextProvider>
		</ChatContextProvider>
	),

	establisher: ({ data, children }: ProviderProps<EstablisherData>) => (
		<CommonProviders data={data}>
			<EstablishmentContextProvider establishments={data.establishmentsResponse}>
				<ChatContextProvider chatResponse={data.chatResponse}>
					<RolesContextProvider roles={data.rolesResponse}>
						{children}
					</RolesContextProvider>
				</ChatContextProvider>
			</EstablishmentContextProvider>
		</CommonProviders>
	),

	establishment_worker: ({ data, children }: ProviderProps<EstablishmentWorkerData>) => (
		<CommonProviders data={data}>{children}</CommonProviders>
	),
} as const;
