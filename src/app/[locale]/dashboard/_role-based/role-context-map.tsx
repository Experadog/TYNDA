import type { ReactNode } from 'react';

import type { GetEstablishmentAllClientResponseModel } from '@/services';
import type {
	EstablisherData,
	EstablishmentWorkerData,
	PageSettings,
	SuperUserData,
} from '@common';
import { UpdateProfileProvider } from '../../profile/update-profile/use-case/useUpdateProfileUseCase';
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
	establishmentsResponse: GetEstablishmentAllClientResponseModel;
	settingsData: PageSettings;
};

function CommonProviders({ data, children }: { data: CommonProviderData; children: ReactNode }) {
	return (
		<SettingsContextProvider settings={data.settingsData}>
			<EstablishmentContextProvider establishments={data.establishmentsResponse}>
				<UpdateProfileProvider>{children}</UpdateProfileProvider>
			</EstablishmentContextProvider>
		</SettingsContextProvider>
	);
}

export const roleContextMap = {
	superadmin: ({ data, children }: ProviderProps<SuperUserData>) => (
		<ChatContextProvider chatResponse={data.chatResponse}>
			<TariffContextProvider
				cardsResponse={data.cardResponse?.data}
				tariffsResponse={data.tariffResponse?.data}
			>
				<CommonProviders data={data}>
					<UsersContextProvider usersResponse={data.usersResponse}>
						<RolesContextProvider roles={data.rolesResponse}>
							{children}
						</RolesContextProvider>
					</UsersContextProvider>
				</CommonProviders>
			</TariffContextProvider>
		</ChatContextProvider>
	),

	establisher: ({ data, children }: ProviderProps<EstablisherData>) => (
		<CommonProviders data={data}>
			<ChatContextProvider chatResponse={data.chatResponse}>
				<RolesContextProvider roles={data.rolesResponse}>{children}</RolesContextProvider>
			</ChatContextProvider>
		</CommonProviders>
	),

	establisher_worker: ({ data, children }: ProviderProps<EstablishmentWorkerData>) => (
		<CommonProviders data={data}>{children}</CommonProviders>
	),
} as const;
