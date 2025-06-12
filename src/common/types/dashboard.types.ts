import type {
	CardListRetrievalResponseModel,
	ChatListRetrievalResponseModel,
	GetEstablishmentAllClientResponseModel,
	GetRolesResponseModel,
	TariffListRetrievalResponseModel,
	UsersRetrievalResponseModel,
} from '@/services';

export type PageSettings = {
	isGrayscale: boolean;
	fontSize: 'small' | 'medium' | 'large';
	isUnderlineLinks: boolean;
	borderRadius: 'none' | 'medium' | 'large';
};

export type CommonData = {
	establishmentsResponse: GetEstablishmentAllClientResponseModel;
	settingsData: PageSettings;
};

export type EstablisherData = CommonData & {
	rolesResponse: GetRolesResponseModel;
	chatResponse: ChatListRetrievalResponseModel;
};

export type SuperUserData = CommonData & {
	rolesResponse: GetRolesResponseModel;
	usersResponse: UsersRetrievalResponseModel;
	chatResponse: ChatListRetrievalResponseModel;
	tariffResponse: TariffListRetrievalResponseModel;
	cardResponse: CardListRetrievalResponseModel;
};

export type EstablishmentWorkerData = CommonData;

export type RoleResult =
	| { roleType: 'superadmin'; data: SuperUserData }
	| { roleType: 'establisher'; data: EstablisherData }
	| { roleType: 'establisher_worker'; data: CommonData };
