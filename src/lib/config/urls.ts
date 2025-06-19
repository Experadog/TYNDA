export enum URL_ENTITIES {
	//auth
	LOGIN = '/auth/login',
	LOGOUT = '/auth/logout',
	REFRESH_TOKEN = '/auth/refresh-token',
	CALLBACK_GOOGLE = '/auth/login/callback_from_google',

	//sys
	REGISTER = '/sys/users/register',
	PROFILE = '/sys/users/me',
	ACTIVATE_ACCOUNT = '/sys/users/activate',
	PHONE_PRE_VERIFY = '/sys/users/pre-verify-phone-telegram',
	VERIFY_PHONE = '/sys/users/verify-phone',
	UPDATE_CREDENTIALS = '/sys/users/password/reset',
	PERMISSIONS = '/sys/perm',
	ROLES = '/sys/permission_groups',
	STAFF = '/sys/establishment_staff',
	USERS = '/sys/users',
	CREATE_USER_ADMIN = '/sys/users/admin-add-user',

	//biz
	CARD_HISTORY = '/biz/card_history/client-history',
	CARD_ALL = '/biz/card/all',
	TARIFF_CLIENT_ALL = '/biz/tariff/client/all',
	TARIFF_ALL = '/biz/tariff/all',
	USER_CARD = '/biz/card/user-card',
	TARIFF = '/biz/tariff',

	//base
	LOAD_FILE = '/base/resources',

	//org
	ESTABLISHMENT_ALL_CLIENT = '/org/establishment/all-client',
	ESTABLISHMENT_ALL_ESTABLISHER = '/org/establishment/all-establisher',
	ESTABLISHMENT_ALL_ADMIN = '/org/establishment/all',
	ESTABLISHMENT_DETAIL = '/org/establishment/detail',
	ESTABLISHMENT_CREATION_ADMIN = '/org/establishment/admin',

	ESTABLISHMENT = '/org/establishment',

	//mes
	CHAT_MY = '/mes/chat/my',
	CHAT = '/mes/chat',
	CHAT_ESTABLISHMENT = '/mes/chat/establishment',
}

export enum URL_LOCAL_ENTITIES {
	REVALIDATE = '/revalidate',
	SESSION = '/session',
	REFRESH = '/refresh',
	CLEAR_SESSION = '/clear-session',
	TRANSLATE = '/translate',
}

export const WEBSOCKET_API = 'wss://soyuz.kg/skgapi/v1/mes/chat/ws?token=';
