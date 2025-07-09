import type {
	CardListRetrievalResponseModel,
	ChatListRetrievalResponseModel,
	EstablishmentClientRetrievalResponseModel,
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
	settingsData: PageSettings;
};

export type EstablisherData = CommonData & {
	rolesResponse: GetRolesResponseModel;
	chatResponse: ChatListRetrievalResponseModel;
	establishmentsResponse: EstablishmentClientRetrievalResponseModel;
};

export type SuperUserData = CommonData & {
	rolesResponse: GetRolesResponseModel;
	allUsersResponse: UsersRetrievalResponseModel;
	chatResponse: ChatListRetrievalResponseModel;
	tariffResponse: TariffListRetrievalResponseModel;
	cardResponse: CardListRetrievalResponseModel;
	establisherOnlyResponse: UsersRetrievalResponseModel;
	establishmentsResponse: EstablishmentClientRetrievalResponseModel;
};

export type EstablishmentWorkerData = CommonData;

export type RoleResult =
	| { roleType: 'superadmin'; data: SuperUserData }
	| { roleType: 'establisher'; data: EstablisherData }
	| { roleType: 'establishment_worker'; data: CommonData };
